import {
  create_notification,
  fetch_all_notifications,
  fetch_single_notification,
  update_notification,
} from "../helpers/notifications.helpers.js";

export const createNotificationController = async (req, res) => {
  try {
    const { message, userId, tripId, type } = req.body;

    await create_notification(message, userId, tripId, type);
    return res.status(200).json({
      msg: "Notification created",
      data: await fetch_all_notifications(userId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const updateNotificationController = async (req, res) => {
  try {
    const notificationId = req.params.id;

    await update_notification(notificationId);
    return res.status(200).json({
      msg: "Notification updated",
      data: await fetch_single_notification(notificationId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};

export const getAllNotificationController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await fetch_all_notifications(userId);
    return res.status(200).json({
      data,
    });
  } catch (error) {}
};

export const getSingleNotificationController = async (req, res) => {
  try {
    const notificationId = req.params.id;

    return res.status(200).json({
      data: await fetch_single_notification(notificationId),
    });
  } catch (err) {
    return res.status(400).json({
      error: "An error occured",
      err: err,
    });
  }
};
