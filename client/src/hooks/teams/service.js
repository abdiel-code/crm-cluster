import { socket } from "../../core/socketInstance.js";

export const createTeam = async (formData) => {

    console.log("createTeam called with formData:", formData);

    const response = socket.emit("createTeam", formData);
    return new Promise((resolve, reject) => {
        response.on("teamCreated", (data) => {
            if (data.success) {
                resolve(data.team);
            } else {
                reject(data.error);
            }
        });
    });
};