module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define("Tasks", {
        Task: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        completeness: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    })

    return Tasks;
};