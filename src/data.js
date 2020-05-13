import axios from 'axios';

const dreamFactory = () => {
  const token = localStorage.getItem('session_token');

  if (!token) {
    throw Error('Not logged in');
  }

  return axios.create({
    baseURL: window.appConfig.INSTANCE_URL,
    headers: {
      'X-DreamFactory-API-Key': window.appConfig.APP_API_KEY,
      'X-DreamFactory-Session-Token': token,
    },
  })
};

export const contacts = {
  getAll({ include_count, offset, limit, order }) {
    return dreamFactory().get('/api/v2/db/_table/contact', {
      params: {
        include_count: include_count || true,
        offset: Number.isInteger(offset) ? offset : 0,
        limit: Number.isInteger(limit) ? limit : 10,
        order: order || 'last_name asc',
      }
    });
  },
  getOne(id) {
    return dreamFactory().get(`/api/v2/db/_table/contact/${id}`);
  },
  getOneWithInfoAndGroups(id) {
    return dreamFactory().get(`/api/v2/db/_table/contact/${id}?related=*`);
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
};

export const contact_info = {
  getInfo(id) {
    return dreamFactory().get('/api/v2/db/_table/contact_info', {
      params: {
        filter: `contact_id=${id}`,
      }
    });
  },
};

export const groups = {
  getAll({ include_count, offset, limit, order }) {
    return dreamFactory().get('/api/v2/db/_table/contact_group', {
      params: {
        include_count: include_count || true,
        offset: Number.isInteger(offset) ? offset : 0,
        limit: Number.isInteger(limit) ? limit : 10,
        order: order || 'name asc',
      }
    });
  },
  getOne(id) {
    return dreamFactory().get(`/api/v2/db/_table/contact_group/${id}`);
  },
  create(name) {
    return dreamFactory().post(`/api/v2/db/_table/contact_group`, {
      resource: [{ name }],
    });
  }
}
