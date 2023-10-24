<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-data-iterator
          :items="modules"
          :items-per-page.sync="itemsPerPage"
          :server-items-length="total"
          :search="search"
          :options.sync="pagination"
          :loading="loading"
          :footer-props="{
            'items-per-page-options': [5, 10, 15, 25, 30, 35, 50, 100],
          }"
        >
          <template #loading>
            <v-card flat>
              <v-card-text>
                <v-skeleton-loader
                  loading
                  :type="`list-item-avatar-two-line@${itemsPerPage}`"
                />
              </v-card-text>
            </v-card>
          </template>
          <template #header>
            <v-toolbar flat :extended="$vuetify.breakpoint.smAndDown">
              <v-toolbar-title v-text="$t('titles.Modules')" />
              <v-spacer />
              <v-text-field
                v-model="search"
                :label="$t('buttons.Search')"
                type="search"
                single-line
                clearable
                hide-details
                class="hidden-sm-and-down ml-3"
                prepend-icon="mdi-magnify"
                :loading="loading"
                :disabled="loading"
              />
              <v-spacer />
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    :loading="loading"
                    :disabled="loading"
                    @click="list = true"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-format-list-bulleted'" />
                  </v-btn>
                </template>
                <span v-text="$t('buttons.List')" />
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    :loading="loading"
                    :disabled="loading"
                    @click="list = false"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-grid'" />
                  </v-btn>
                </template>
                <span v-text="$t('buttons.Grid')" />
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    icon
                    :loading="loading"
                    :disabled="loading"
                    @click="getModules"
                    v-on="on"
                  >
                    <v-icon v-text="'mdi-refresh'" />
                  </v-btn>
                </template>
                <span v-text="$t('buttons.Refresh')" />
              </v-tooltip>
              <template v-if="$vuetify.breakpoint.smAndDown" #extension>
                <v-text-field
                  v-model="search"
                  :label="$t('buttons.Search')"
                  type="search"
                  single-line
                  clearable
                  hide-details
                  prepend-icon="mdi-magnify"
                  :loading="loading"
                  :disabled="loading"
                />
              </template>
            </v-toolbar>
          </template>
          <template #default="props">
            <v-skeleton-loader
              :loading="loading"
              :type="`list-item-avatar-two-line@${itemsPerPage}`"
            >
              <v-row>
                <v-col v-if="list" cols="12" sm="12" md="12">
                  <v-list two-line>
                    <v-list-item v-for="(item, i) in props.items" :key="i">
                      <v-list-item-avatar>
                        <v-avatar v-if="item.icon" color="success">
                          <v-icon dark v-text="item.icon" />
                        </v-avatar>
                        <v-img v-else :alt="item.name" :src="item.image" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name" />
                        <v-list-item-subtitle v-text="item.area" />
                      </v-list-item-content>
                      <v-list-item-action>
                        <template v-if="item.compatible">
                          <v-btn fab small color="primary" :to="item.redirect">
                            {{ $t('buttons.Go') }}
                          </v-btn>
                        </template>
                        <template v-else>
                          <form
                            :action="item.redirect"
                            method="post"
                            target="_blank"
                          >
                            <input
                              type="hidden"
                              name="vector_modulo"
                              :value="item.encoded"
                            />
                            <v-btn
                              fab
                              small
                              block
                              color="primary"
                              name="Btn_Ir"
                              type="submit"
                              v-text="$t('buttons.Go')"
                            />
                          </form>
                        </template>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-col>
                <template v-if="!list">
                  <v-col
                    v-for="(item, i) in props.items"
                    :key="i"
                    class="mt-4 mx-auto"
                    cols="12"
                    sm="6"
                    lg="3"
                  >
                    <v-card>
                      <v-card-text class="px-0">
                        <v-list two-line>
                          <v-list-item>
                            <v-list-item-avatar>
                              <v-avatar v-if="item.icon" color="success">
                                <v-icon dark v-text="item.icon" />
                              </v-avatar>
                              <v-img
                                v-else
                                :alt="item.name"
                                :src="item.image"
                              />
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title v-text="item.name" />
                              <v-list-item-subtitle v-text="item.area" />
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                      <v-card-actions>
                        <template v-if="item.compatible">
                          <v-btn
                            :aria-label="$t('buttons.Go')"
                            block
                            color="primary"
                            :to="item.redirect"
                            v-text="$t('buttons.Go')"
                          >
                          </v-btn>
                        </template>
                        <template v-else>
                          <form
                            :action="item.redirect"
                            method="post"
                            target="_blank"
                            style="width: 100%"
                          >
                            <input
                              type="hidden"
                              name="vector_modulo"
                              :value="item.encoded"
                            />
                            <v-btn
                              :aria-label="$t('buttons.Go')"
                              block
                              color="primary"
                              name="Btn_Ir"
                              type="submit"
                              v-text="$t('buttons.Go')"
                            />
                          </form>
                        </template>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </template>
              </v-row>
            </v-skeleton-loader>
          </template>
          <template #no-data>
            <v-card v-if="items.length === 0" flat>
              <v-card-text>
                <v-empty-state
                  icon="mdi-grid-off"
                  :label="$t('texts.EmptyModules')"
                  :description="$t('texts.EmptyModulesText')"
                />
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text>
                <v-empty-state
                  icon="mdi-text-search"
                  :label="$t('$vuetify.dataIterator.noResultsText')"
                />
              </v-card-text>
            </v-card>
          </template>
          <template #no-results>
            <v-card flat>
              <v-card-text>
                <v-empty-state
                  icon="mdi-text-search"
                  :label="$t('$vuetify.dataIterator.noResultsText')"
                />
              </v-card-text>
            </v-card>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<router lang="yaml">
meta:
  title: titles.Modules
</router>

<script>
import { dispatch } from 'vuex-pathify'
import { Module } from '@/models/services/auth/Module'

export default {
  name: 'Home',
  nuxtI18n: {
    paths: {
      en: '/home',
      es: '/modulos',
    },
  },
  components: {
    VEmptyState: () => import('@/components/base/EmptyState'),
  },
  head: (vm) => ({
    title: vm.$t('titles.Modules'),
  }),
  layout: 'principal',
  auth: 'auth',
  data: () => ({
    loading: false,
    search: '',
    form: new Module(),
    modules: [],
    items: [],
    list: true,
    itemsPerPage: 35,
    total: 0,
    pagination: {},
  }),
  watch: {
    'pagination.page'() {
      this.getModules()
    },
    itemsPerPage() {
      this.getModules()
    },
    search(search) {
      if (!search) {
        this.modules = this.items
      }
      search = (search || '').toString().toLowerCase()
      if (search.trim() === '') {
        this.modules = this.items
      }
      this.modules = this.items.filter((item) =>
        Object.keys(item).some((key) =>
          this.defaultFilter(this.getObjectValueByPath(item, key), search, item)
        )
      )
    },
  },
  mounted() {
    dispatch('app/unsetPermissions')
    dispatch('app/unsetBouncer')
    dispatch('app/unsetMenuDrawer')
  },
  methods: {
    getModules() {
      this.loading = true
      const { page, itemsPerPage } = this.pagination
      const params = {
        page,
        per_page: itemsPerPage,
      }
      const parks = {
        id: Math.random(),
        icon: 'mdi-pine-tree',
        name: 'MÓDULO DE PARQUES 2.0',
        area: 'STC - STP',
        redirect: this.localePath({ name: 'parks' }),
        status: true,
        missionary: true,
        compatible: true,
        access: [],
        encoded: null,
      }
      this.form
        .user({ params })
        .then((response) => {
          this.items = response.data
          this.modules = response.data
          this.total = response.meta.total + 1
          // this.items.unshift(parks)
          this.modules.unshift(parks)
        })
        .catch((errors) => {
          this.$snackbar({ message: errors.message })
        })
        .finally(() => (this.loading = false))
    },
    onSubmit($ref) {
      this.$refs[$ref].submit()
    },
    defaultFilter(value, search = null, item) {
      return (
        value != null &&
        search != null &&
        typeof value !== 'boolean' &&
        value
          .toString()
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      )
    },
    getObjectValueByPath(obj, path, fallback = undefined) {
      if (obj == null || !path || typeof path !== 'string') return fallback
      if (obj[path] !== undefined) return obj[path]
      path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
      path = path.replace(/^\./, '') // strip a leading dot
      return this.getNestedValue(obj, path.split('.'), fallback)
    },
    getNestedValue(obj, path, fallback) {
      const last = path.length - 1
      if (last < 0) return obj === undefined ? fallback : obj
      for (let i = 0; i < last; i++) {
        if (obj == null) {
          return fallback
        }
        obj = obj[path[i]]
      }
      if (obj == null) return fallback
      return obj[path[last]] === undefined ? fallback : obj[path[last]]
    },
  },
}
</script>
