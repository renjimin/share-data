import { mapMutations, mapState } from 'vuex';
export default {
  computed: {
    ...mapState('user', {
      userInput: state => state.userInput
    })
  },
  watch: {
    userInput: {
      handler() {
        // this.watchChanged()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapMutations('user', [
      'SET_USER_INPUT'
    ]),
    changeCurrentCom(currentCom) {
      this.SET_USER_INPUT(this.formData);
      this.$emit('update:currentCom', currentCom);
    }
  }
}
