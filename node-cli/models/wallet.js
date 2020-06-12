const { sequelize } = require(".");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "wallet",
        {
            money: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: "금액",
            },
            desc: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "설명",
            },
            type: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                comment: "True면 수입/ False면 지출",
            },
        },
        {
            timestamps: true, //created_at, updated_at을 자동으로 해줌
        }
    );
};
