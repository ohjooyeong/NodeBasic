const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            email: {
                type: DataTypes.STRING(40),
                allowNull: false,
                unique: true,
            },
            nick: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            provider: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: "local",
            }, // local vs kakao
            snsId: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            timestamps: true, // 생성일, 수정일
            paranoid: true, // 삭제일(복구용)
            charset: "utf8",
            collate: "utf8_unicode_ci",
        }
    );
};
