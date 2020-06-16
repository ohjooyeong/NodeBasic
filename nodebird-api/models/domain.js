const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

// 사용자에게 발급할 시크릿키와 도메인 주소를 저장하는 모델
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "domain",
        {
            host: {
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            clientSecret: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
        },
        {
            validate: {
                unknownType() {
                    if ((this.type !== "free") & (this.type !== "premium")) {
                        throw new Error("type 컬럼은 free거나 premium이어야 합니다");
                    }
                },
            },
            timestamps: true,
            paranoid: true,
        }
    );
};
