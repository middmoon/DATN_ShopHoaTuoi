const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AuditLog extends Model {}

  AuditLog.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Tạo UUID tự động
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" }, // Liên kết tới bảng users
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false, // VD: "CREATE_PRODUCT", "DELETE_ORDER"
      },
      entity: {
        type: DataTypes.STRING,
        allowNull: false, // VD: "products", "orders"
      },
      entity_id: {
        type: DataTypes.UUID, // ID của bản ghi bị tác động
        allowNull: true,
      },
      request_data: {
        type: DataTypes.JSON, // Lưu data của request (nếu cần)
        allowNull: true,
      },
      response_status: {
        type: DataTypes.INTEGER, // HTTP status code (200, 400, 500)
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING, // IP của user
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.STRING, // Thông tin trình duyệt, thiết bị
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "AuditLog",
      tableName: "audit_logs",
      timestamps: false, // Vì đã có `created_at`
    }
  );

  return AuditLog;
};
