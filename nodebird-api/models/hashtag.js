const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "hashtag",
        {
            title: {
                type: DataTypes.STRING(15),
                allowNull: false,
                unique: true,
            },
        },
        {
            titmestamps: true,
            parnoid: true,
            charset: "utf8",
            collate: "utf8_unicode_ci",
        }
    );
};
