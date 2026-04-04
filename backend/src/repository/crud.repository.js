class CrudRepository {
  constructor(model, options = {}) {
    if (!model) {
      throw new Error("Model instance is required to initialize CrudRepository");
    }

    this.model = model;
    this.options = {
      softDelete: options.softDelete !== false,
      softDeleteField: options.softDeleteField || "is_deleted",
    };
  }

  get hasSoftDelete() {
    return Boolean(this.model.rawAttributes?.[this.options.softDeleteField]);
  }

  buildWhere(where = {}, includeDeleted = false) {
    if (!this.options.softDelete || !this.hasSoftDelete || includeDeleted) {
      return { ...where };
    }

    return {
      ...where,
      [this.options.softDeleteField]: false,
    };
  }

  async create(payload, queryOptions = {}) {
    return this.model.create(payload, queryOptions);
  }

  async getById(id, queryOptions = {}) {
    const { includeDeleted = false, where = {}, ...rest } = queryOptions;

    return this.model.findOne({
      where: this.buildWhere({ ...where, id }, includeDeleted),
      ...rest,
    });
  }

  async getOne(where = {}, queryOptions = {}) {
    const { includeDeleted = false, ...rest } = queryOptions;

    return this.model.findOne({
      where: this.buildWhere(where, includeDeleted),
      ...rest,
    });
  }

  async getAll(queryOptions = {}) {
    const { where = {}, includeDeleted = false, ...rest } = queryOptions;

    return this.model.findAll({
      where: this.buildWhere(where, includeDeleted),
      ...rest,
    });
  }

  async updateById(id, payload, queryOptions = {}) {
    const { includeDeleted = false, ...rest } = queryOptions;

    const instance = await this.getById(id, {
      includeDeleted,
      ...rest,
    });

    if (!instance) {
      return null;
    }

    return instance.update(payload, rest);
  }

  async deleteById(id, queryOptions = {}) {
    const { force = false, includeDeleted = false, ...rest } = queryOptions;

    const instance = await this.getById(id, {
      includeDeleted,
      ...rest,
    });

    if (!instance) {
      return false;
    }

    if (this.options.softDelete && this.hasSoftDelete && !force) {
      await instance.update({
        [this.options.softDeleteField]: true,
      });
      return true;
    }

    await instance.destroy(rest);
    return true;
  }
}

module.exports = CrudRepository;
