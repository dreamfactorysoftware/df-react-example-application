import axios from 'axios';
/* eslint-disable camelcase */

const dreamFactory = () => {
  const token = localStorage.getItem('session_token');

  return axios.create({
    baseURL: window.appConfig.INSTANCE_URL,
    headers: {
      'X-DreamFactory-API-Key': window.appConfig.APP_API_KEY,
      'X-DreamFactory-Session-Token': token,
    },
  });
};

export const contact = {
  getAll({ include_count, offset, limit, order, filter }) {
    const params = {
      include_count: include_count || true,
      offset: Number.isInteger(offset) ? offset : 0,
      limit: Number.isInteger(limit) ? limit : 10,
      order: order || 'last_name asc',
    };

    if (filter) {
      params.filter = filter;
    }

    return dreamFactory().get('/api/v2/db/_table/contact', {
      params,
    });
  },
  getOne(id) {
    return dreamFactory().get(`/api/v2/db/_table/contact/${id}`);
  },
  getOneWithInfoAndGroups(id) {
    return dreamFactory().get(`/api/v2/db/_table/contact/${id}?related=*`);
  },
  create(resource) {
    return dreamFactory().post('/api/v2/db/_table/contact?rollback=true', {
      resource,
    });
  },
  update(id, data) {
    return dreamFactory().patch(`/api/v2/db/_table/contact/${id}`, data);
  },
  delete(id) {
    return dreamFactory().delete(`/api/v2/db/_table/contact/${id}`);
  },
};

export const contact_group_relationship = {
  getContactsByGroupId(id) {
    return dreamFactory().get('/api/v2/db/_table/contact_group_relationship', {
      params: {
        filter: `contact_group_id=${id}`,
        related: 'contact_by_contact_id',
      }
    });
  },
  create(resource) {
    return dreamFactory().post('/api/v2/db/_table/contact_group_relationship', {
      resource,
    });
  },
  delete(id) {
    return dreamFactory().delete(`/api/v2/db/_table/contact_group_relationship/${id}`);
  },
};

export const contact_info = {
  delete(id) {
    return dreamFactory().delete(`/api/v2/db/_table/contact_info/${id}`);
  },
  create(resource) {
    return dreamFactory().post('/api/v2/db/_table/contact_info', {
      resource,
    });
  },
  update(id, data) {
    return dreamFactory().patch(`/api/v2/db/_table/contact_info/${id}`, data);
  },
};

export const contact_group = {
  getAll({ include_count, offset, limit, order, filter }) {
    const params = {
      include_count: include_count || true,
      offset: Number.isInteger(offset) ? offset : 0,
      limit: Number.isInteger(limit) ? limit : 10,
      order: order || 'name asc',
    };

    if (filter) {
      params.filter = filter;
    }

    return dreamFactory().get('/api/v2/db/_table/contact_group', {
      params,
    });
  },
  getOne(id) {
    return dreamFactory().get(`/api/v2/db/_table/contact_group/${id}`);
  },
  create(name) {
    return dreamFactory().post('/api/v2/db/_table/contact_group', {
      resource: [{ name }],
    });
  },
  delete(id) {
    return dreamFactory().delete(`/api/v2/db/_table/contact_group/${id}`);
  },
  update(id, name) {
    return dreamFactory().patch(`/api/v2/db/_table/contact_group/${id}`, {
      name,
    });
  }
};
