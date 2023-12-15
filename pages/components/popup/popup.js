Component({
  mixins: [],
  data: {},
  props: {
    className: '',
    show: false,
    position: 'bottom',
    mask: true,
    animation: true,
    disableScroll: true,
    onclose:data=>data


  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onMaskTap() {
      const {
        onClose,
        animation
      } = this.props;

      if (onClose) {
        if (animation) {
          onClose();
        } else {
          setTimeout(() => {
            onClose();
          }, 200);
        }

      }
    }
  },
});