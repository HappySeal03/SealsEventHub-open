use rocket::{http::Status, serde::json::Json, State};
use crate::{auth::JwtToken, database::DbClient, model::{AnnouncementData, ChannelData, GenericResponse}, utils::get_channel_role};

/*
    Create a new channel.
    Sender must be a website admin
    TODO: ADD THE CREATOR AS A CHANNEL ADMIN
*/
#[post("/channels/create", data= "<channel_data>")]
pub async fn create_new_channel(_jwt_token: JwtToken, channel_data: Json<ChannelData>, db_client: &State<DbClient>) -> Result<Json<GenericResponse>, Status> {
    
    if _jwt_token.0.role != "admin" {
        return Err(Status::Unauthorized);
    }

    if !channel_data.validate_for_creation() {
        return Err(Status::BadRequest);
    }
    
    let client = db_client.client.lock().await;
    
    //check if the channel already exists
    let statement = client.prepare("
    SELECT channel_name FROM channels WHERE channel_name = $1
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    let res = client.query(&statement, &[&channel_data.channel_name]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    if res.get(0).is_some() {
        return Err(Status::Forbidden);
    }

    //create the channel
    let statement = client.prepare("
    INSERT INTO channels (channel_name, channel_description, created_by)
    VALUES ($1, $2, $3)
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    client.execute(&statement, &[&channel_data.channel_name, &channel_data.channel_description, &_jwt_token.0.user_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    return Ok(Json(GenericResponse {
        message: "Channel created successfully".to_string()
    }));
}

/*
    TODO
    Edit a channel's name and/or description
    Sender must be a channel admin or a website admin
*/
#[post("/channels/edit", data = "<channel_data>")]
pub async fn edit_channel(_jwt_token: JwtToken, channel_data: Json<ChannelData>, db_client: &State<DbClient>) -> Result<Json<GenericResponse>, Status> {

    let client = db_client.client.lock().await;

    //TODO: VALIDATE channel_data

    let role = match get_channel_role(_jwt_token.0.user_id, channel_data.channel_id.unwrap(), &client).await {
        Ok(channel_role) => channel_role,
        Err(e) => return Err(e)
    };

    if !role.can_edit_channel() {
        return Err(Status::Unauthorized);
    }

    //TODO: INSERT EDITING LOGIC

    return Ok(Json(GenericResponse {
        message: "Channel edited successfully".to_string()
    }));
}

/*
    Delete a selected channel.
    Sender must be a channel admin or website admin
*/
#[delete("/channels/delete/<channel_to_delete_id>")]
pub async fn delete_channel(_jwt_token: JwtToken, channel_to_delete_id: i32, db_client: &State<DbClient>) -> Result<Json<GenericResponse>, Status> {

    let client = db_client.client.lock().await;

    let role = match get_channel_role(_jwt_token.0.user_id, channel_to_delete_id, &client).await {
        Ok(channel_role) => channel_role,
        Err(e) => return Err(e)
    };

    if !role.can_delete_channel() {
        return Err(Status::Unauthorized);
    }

    let statement = client.prepare("
    DELETE FROM channels WHERE channel_id = $1
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    client.execute(&statement, &[&channel_to_delete_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    return Ok(Json(GenericResponse {
        message: "Channel deleted successfully".to_string()
    }));
}

/*
    User joins a channel
    TODO: HANDLE THE CASE WHERE A USER IS ALREADY IN THE CHANNEL MORE GRACEFULLY
*/
#[get("/channels/join/<channel_to_join_id>")]
pub async fn join_channel(_jwt_token: JwtToken, channel_to_join_id: i32, db_client: &State<DbClient>) -> Result<Json<GenericResponse>, Status> {

    let user_id: i32 = _jwt_token.0.user_id;
    let client = db_client.client.lock().await;

    //Check if the channel exists
    let statement = client.prepare("
    SELECT channel_id FROM channels WHERE channel_id = $1
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    let res = client.query(&statement, &[&channel_to_join_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    if res.get(0).is_none() {
        return Err(Status::NotFound);
    }

    //Join the channel with default role permissions
    let statement = client.prepare("
    INSERT INTO event_channel_roles (user_id, channel_id) VALUES ($1, $2)
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    client.execute(&statement, &[&user_id, &channel_to_join_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    return Ok(Json(GenericResponse {
        message: "Channel joined successfully".to_string()
    }));
} 


/*
    User leaves a channel
*/
#[get("/channels/leave/<channel_to_leave_id>")]
pub async fn leave_channel(_jwt_token: JwtToken, channel_to_leave_id: i32, db_client: &State<DbClient>) -> Result<Json<GenericResponse>, Status> {

    let user_id: i32 = _jwt_token.0.user_id;
    let client = db_client.client.lock().await;

    //Check if the channel exists
    let statement = client.prepare("
    DELETE FROM event_channel_roles WHERE user_id = $1 AND channel_id = $2
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    client.execute(&statement, &[&user_id, &channel_to_leave_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    return Ok(Json(GenericResponse {
        message: "Channel joined successfully".to_string()
    }));
}

/*
    Retrieves all channels a user is subscribed to
*/
#[get("/channels/get-my-channels")]
pub async fn get_my_channels(_jwt_token: JwtToken, db_client: &State<DbClient>) -> Result<Json<Vec<ChannelData>>, Status> {
    let client = db_client.client.lock().await;

    //TO FINISH
    let statement = client.prepare("
    SELECT c.channel_id, c.channel_name, c.channel_description
    FROM Channels c
    JOIN event_channel_roles ecr ON c.channel_id = ecr.channel_id
    WHERE ecr.user_id = $1
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    let rows = client.query(&statement, &[&_jwt_token.0.user_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    let channels: Vec<ChannelData> = rows.into_iter().map(|row| {
        ChannelData {
            channel_id: row.get("channel_id"),
            channel_name: row.get("channel_name"),
            channel_description: row.get("channel_description"),
        }
    }).collect();

    return Ok(Json(channels));
}

/*
    /channes/post
    Create a markdown post in the channel
*/
#[post("/channels/post", data = "<announcement>")]
pub async fn post_announcement(_jwt_token: JwtToken, announcement: Json<AnnouncementData>, db_client: &State<DbClient>) -> Result<Json<GenericResponse>, Status> {

    if !announcement.validate() {
        return Err(Status::BadRequest);
    }

    let client = db_client.client.lock().await;

    let role = match get_channel_role(_jwt_token.0.user_id, announcement.channel_id.unwrap(), &client).await {
        Ok(channel_role) => channel_role,
        Err(e) => return Err(e)
    };

    if !role.can_post_announcements() {
        return Err(Status::Unauthorized);
    }

    let statement = client.prepare("
    INSERT INTO announcements (channel_id, body, posted_by)
    VALUES ($1, $2, $3)
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    client.execute(&statement, &[&announcement.channel_id, &announcement.announcement, &_jwt_token.0.user_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    return Ok(Json(GenericResponse {
        message: "Announcement posted successfully".to_string()
    }));
}

#[get("/channels/get-announcements/<channel_id>")]
pub async fn get_announcements(channel_id: i32, db_client: &State<DbClient>) -> Result<Json<Vec<AnnouncementData>>, Status> {
    
    let client = db_client.client.lock().await;

    let statement = client.prepare("
    SELECT announcement_id, body
    FROM announcements
    WHERE channel_id = $1
    ").await
    .map_err(|e| {
        eprint!("Error with statement preparation: {:?}", e);
        Status::InternalServerError
    })?;

    let rows = client.query(&statement, &[&channel_id]).await
    .map_err(|e| {
        eprint!("Error with query execution: {:?}", e);
        Status::InternalServerError
    })?;

    let announcements: Vec<AnnouncementData> = rows.into_iter().map(|row| {
        AnnouncementData {
            channel_id: row.get("announcement_id"),
            announcement: row.get("body"),
        }
    }).collect();

    return Ok(Json(announcements));

}