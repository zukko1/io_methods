import http from "../http-common";
import axios from "axios";

class UploadFilesService {
  upload(file, onUploadProgress, data) {
    let formData = new FormData();
    formData.append("file", file);
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: 'application/json'
    });

    formData.append("document", blob);

    return axios.post("http://localhost:3200/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();