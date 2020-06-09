module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
            underscored: true,
        }
    );
};

// users 테이블
// 아이디, 이름, 나이, 결혼여부, 자기소개, 생성일
// 1, ohjoo, 26,   false,  안녕하세요, 2020-06-20
// 2, insang, 23, false,  인생.., 2020-06-20
