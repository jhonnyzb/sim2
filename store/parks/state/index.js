const state = () => ({
  finder: {
    params: {
      query: null,
      vigilance: null,
      park_type: [],
      stratum: [],
      location: null,
      upz: null,
      neighborhood: null,
      enclosure: [],
    },
    items: [],
    itemsPerPage: 10,
    pagination: {},
    total: 0,
    pageCount: 0,
  },
})

export default state
