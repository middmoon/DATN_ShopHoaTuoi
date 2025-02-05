"use strict";

const { CREATED, OK } = require("../utils/success.response");
const { BAD_REQUEST, FORBIDDEN, NOTFOUND } = require("../utils/error.response");

const { Material, MaterialAttributeMapping, MaterialAttribute, MeterialImage, MaterialCategory } = require("../models");

class InventoryService {
  //#region Material Category
  // Material Category
  static addMaterialCategory = async (payload) => {
    const newMaterialCategory = await MaterialCategory.create(payload);

    if (!newMaterialCategory) {
      throw BAD_REQUEST("Can not create material category");
    }

    return newMaterialCategory;
  };

  static deleteMaterialCategory = async (materialCategoryId) => {
    const deletedMaterialCategory = await MaterialCategory.destroy({ where: { _id: materialCategoryId } });
    return deletedMaterialCategory;
  };

  static updateMaterialCategory = async (materialCategoryId, payload) => {
    const updatedMaterialCategory = await MaterialCategory.update(payload, {
      where: { _id: materialCategoryId },
    });
    return updatedMaterialCategory;
  };

  static getMaterialCategories = async () => {
    const categories = await MaterialCategory.findAll();
    return categories;
  };

  static getMaterialCategoryById = async (materialCategoryId, conditions) => {
    const materialCategory = await MaterialCategory.findByPk(materialCategoryId, conditions);
    return materialCategory;
  };
  //#endregion

  //#region Material
  static addMaterial = async (payload) => {
    const newMaterial = await Material.create(payload);

    if (!newMaterial) {
      throw BAD_REQUEST("Can not create material");
    }

    return newMaterial;
  };

  static deleteMaterial = async (materialId) => {
    const deletedMaterial = await Material.destroy({ where: { _id: materialId } });
    return deletedMaterial;
  };

  static updateMaterial = async (materialId, payload) => {
    const updatedMaterial = await Material.update(payload, {
      where: { _id: materialId },
    });
    return updatedMaterial;
  };

  static getMaterials = async () => {
    const materials = await Material.findAll();
    return materials;
  };

  static getMaterialById = async (materialId, conditions) => {
    const material = await Material.findByPk(materialId, conditions);
    return material;
  };
  //#endregion

  //#region Material Image
  // Material Image
  static addMaterialImages = async (materialId, imageFiles) => {
    const uploadedImages = [];
    const uploadPromises = imageFiles.map(async (imageFile) => {
      try {
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: "material_images",
          use_filename: true,
          unique_filename: false,
        });

        const uploadedImage = await MeterialImage.create({
          material_id: materialId,
          img_url: result.url,
        });

        uploadedImages.push(result.url);
        return uploadedImage;
      } catch (error) {
        throw new BAD_REQUEST(`Error: Can not upload image or save to the database`);
      }
    });

    await Promise.all(uploadPromises);

    return { uploadedImages };
  };

  static updateMaterialImage = async (materialId, image) => {};

  static deleteMaterialImage = async (materialId, image) => {};
  //#endregion

  //#region Material Attribute
  // Material Attribute
  static addMaterialAttributes = async (materialId, attributes) => {
    const newAttributes = await MaterialAttribute.bulkCreate(attributes);

    if (!newAttributes) {
      throw BAD_REQUEST("Can not create material attribute");
    }

    return newAttributes;
  };

  static updateMaterialAttributes = async (materialId, attributes) => {
    const updatedAttributes = await MaterialAttribute.update(attributes, {
      where: { _id: materialId },
    });
    return updatedAttributes;
  };

  static deleteMaterialAttributes = async (materialId, attributes) => {
    const deletedAttributes = await MaterialAttribute.destroy({
      where: { _id: materialId },
    });
    return deletedAttributes;
  };

  static getMaterialAttributes = async (materialId) => {
    const attributes = await MaterialAttribute.findAll({
      where: { material_id: materialId },
    });
    return attributes;
  };

  static getMaterialAttributeById = async (materialId, attributeId) => {
    const attribute = await MaterialAttribute.findByPk(attributeId, {
      where: { material_id: materialId },
    });
    return attribute;
  };
  //#endregion

  //#region Material Attribute Mapping
  // Material Attribute Mapping
  static addMaterialAttributeMapping = async (materialId, attributeId) => {
    const newAttributeMapping = await MaterialAttributeMapping.create({
      material_id: materialId,
      material_attr_id: attributeId,
    });

    if (!newAttributeMapping) {
      throw BAD_REQUEST("Can not create material attribute mapping");
    }

    return newAttributeMapping;
  };

  static updateMaterialAttributeMapping = async (materialId, attributeId) => {
    const updatedAttributeMapping = await MaterialAttributeMapping.update(
      { material_id: materialId, material_attr_id: attributeId },
      {
        where: { material_id: materialId },
      }
    );
    return updatedAttributeMapping;
  };

  static deleteMaterialAttributeMapping = async (materialId, attributeId) => {
    const deletedAttributeMapping = await MaterialAttributeMapping.destroy({
      where: { material_id: materialId, material_attr_id: attributeId },
    });
    return deletedAttributeMapping;
  };

  static getMaterialAttributeMapping = async (materialId) => {
    const attributeMapping = await MaterialAttributeMapping.findAll({
      where: { material_id: materialId },
    });
    return attributeMapping;
  };

  static getMaterialAttributeMappingById = async (materialId, attributeId) => {
    const attributeMapping = await MaterialAttributeMapping.findByPk(attributeId, {
      where: { material_id: materialId },
    });
    return attributeMapping;
  };
  //#endregion
}

module.exports = InventoryService;
