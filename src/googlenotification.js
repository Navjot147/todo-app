const notificationBuilder = {
    createNotofication: (notifData) => {
        const { body, logoUrl, title } = notifData;
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            return new Notification(title, {
                icon: logoUrl,
                body,
            });
        }
    }
}

export let NotificationBuilder = notificationBuilder;