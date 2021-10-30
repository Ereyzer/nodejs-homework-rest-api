var Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

class UploadFIleAvatar {
  constructor(dest) {
    this.destination = dest;
  }
  async #transformAvatar(pathFile) {
    const pic = await Jimp.read(pathFile);
    await (
      await pic
    )
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }
  async save(file, idUser) {
    await this.#transformAvatar(file.path);
    await fs.rename(file.path, path.join(this.destination, file.filename));
    return path.normalize(path.join(idUser, file.filename));
  }
}

module.exports = UploadFIleAvatar;
