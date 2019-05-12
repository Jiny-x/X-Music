import {mapGetters} from 'vuex'

export const listMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  methods: {
    list() {
      throw new Error('component must implement list method')
    }
  },
  watch: {
    playList(newValue) {
      this.list(newValue)
    }
  },
  mounted() {
    this.list(this.playList)
  },
  activated() {
    this.list(this.playList)
  }
}
