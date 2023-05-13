const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const uploadAvatar = async (req, res) => {
  const { filename } = req.file;
  const { id } = req.user;

  const imageName = `${id}_${filename}`;

  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  const publicPath = path.resolve(__dirname, "../../public/avatars", imageName);

  try {
    await fs.rename(tmpPath, publicPath);
    const file = await Jimp.read(publicPath);
    await file.resize(250, 250).write(publicPath);
    const userId = req.user.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatarURL: publicPath },
      { new: true }
    );
    res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
};

module.exports = uploadAvatar;
