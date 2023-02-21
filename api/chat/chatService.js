const pool = require("../../config/mysql");
const Message = require('../../schemas');

const createChatRoom = async (data) => {
  try {
    const result = await pool.query(
      `insert into CHATROOM(uuid, seller_id, buyer_id, product_id)
      values(?, ?, ?, ?)`,
      [
        data.uuid,
        data.seller_id,
        data.buyer_id,
        data.product_id,
      ]
    )
    
    return result[0];
  } catch (e) {
    throw Error(e);
  }
}

const getChatRoomByUuid = async(uuid) => {
  try {
    const data = await pool.query(
      `select chatRoom_id from CHATROOM where uuid = ${uuid}`
    );

    return data[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const getChatRoomId = async (product_id, seller_id) => {
  try {
    const data = await pool.query(
      `select chatRoom_id from CHATROOM where product_id = ? and seller_id = ?`,
      [
        product_id,
        seller_id
      ]
    );

    return data[0][0];
  } catch (e) {
    throw Error(e);
  }
}

const getChatRoomById = async (chatRoom_id) => {
  try {
    const data = await pool.query(
      `select * from CHATROOM where chatRoom_id in (${chatRoom_id})`
    );
  
    return data[0];
  } catch (e) {
    throw Error(e);
  }
}

const getChatRoomByUserId = async (user_id) => {
  try {
    const data = await pool.query(
      `select * from CHATROOM where buyer_id = ${user_id} or seller_id = ${user_id}`
    );

    for (let value of data[0]) {
      let search_id;
      if (user_id === value.seller_id) {
        search_id = value.buyer_id;
      } else {
        search_id = value.seller_id;
      }

      const getmysql = await pool.query(`select name, addr_name from USER 
        join LOCATION where user_id = ${search_id} and location = location_id`);
      value.displayName = getmysql[0][0].name;
      value.displayLoc = getmysql[0][0].addr_name;

      const getmongo = await Message.findOne({uuid: value.uuid}).sort({created_at: -1});
      value.recentMessage = getmongo.content;
      value.recentTime = getmongo.created_at;
    }

    return data[0];

  } catch (e) {
    throw Error(e);
  }
}

const createMessage = async (data) => {
  try {
    const message = new Message({
        uuid: data.uuid,
        message_from: data.message_from,
        message_to: data.message_to,
        content: data.content,
        created_at: data.created_at
      })
      message.save()
      
    return message;
  } catch (e) {
    throw Error(e);
  }
};

const getMessages = async (uuid) => {
  try {
    const result = await Message.find({uuid: uuid});
    return result;
  } catch (e) {
    throw Error(e);
  }
}


const chatService = {
    createChatRoom,
    getChatRoomId,
    getChatRoomByUuid,
    getChatRoomById,
    getChatRoomByUserId,
    createMessage,
    getMessages
}


module.exports = chatService;