import dreamFactory from './dreamFactory';

export const contacts = {
  getList({ include_count, offset, limit, order }) {
    return dreamFactory().get('/api/v2/db/_table/contact', {
      params: {
        include_count: include_count || true,
        offset: Number.isInteger(offset) ? offset : 0,
        limit: Number.isInteger(limit) ? limit : 10,
        order: order || 'last_name asc',
      }
    });
  },
};
