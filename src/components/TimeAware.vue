<template>
  <div :class="stateClasses">
    <slot />
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'TimeAware',
  props: {
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    refreshInterval: {
      type: Number,
      default: 2000 // 2 seconds
    },
    upcomingThreshold: {
      type: Number,
      default: 30 * 60 * 1000 // 30 minutes
    }
  },
  emits: ['state-changed'],
  setup(props, { emit }) {
    const currentState = ref('future')
    const intervalId = ref(null)

    const stateClasses = computed(() => ({
      'time-aware': true,
      'time-aware-past': currentState.value === 'past',
      'time-aware-current': currentState.value === 'current',
      'time-aware-upcoming': currentState.value === 'upcoming' || currentState.value === 'upcoming-future',
      'time-aware-future': currentState.value === 'future' || currentState.value === 'upcoming-future'
    }))

    const getState = () => {
      const startTimeMs = new Date(props.startTime).getTime()
      const endTimeMs = new Date(props.endTime).getTime()
      const nowMs = new Date().getTime()
      const upcomingMilliseconds = props.upcomingThreshold

      if (nowMs > endTimeMs) {
        return 'past'
      }

      if (startTimeMs < nowMs && nowMs < endTimeMs) {
        return 'current'
      }

      if (upcomingMilliseconds &&
          nowMs < startTimeMs &&
          startTimeMs < nowMs + upcomingMilliseconds &&
          nowMs + upcomingMilliseconds < endTimeMs) {
        return 'upcoming-future'
      }

      if (nowMs < startTimeMs) {
        return 'future'
      }

      return 'future'
    }

    const refresh = () => {
      const newState = getState()

      if (newState !== currentState.value) {
        currentState.value = newState
        emit('state-changed', { state: newState })

        // Stop interval if event is past
        if (newState === 'past' && intervalId.value) {
          clearInterval(intervalId.value)
          intervalId.value = null
        }
      }
    }

    onMounted(() => {
      // Initial refresh
      refresh()

      // Only set interval if not already past
      if (currentState.value !== 'past') {
        intervalId.value = setInterval(refresh, props.refreshInterval)
      }
    })

    onBeforeUnmount(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value)
      }
    })

    return {
      currentState,
      stateClasses
    }
  }
}
</script>

<style scoped>
.time-aware {
  /* Base styles */
}

.time-aware-past {
  /* Will be styled in parent */
}

.time-aware-current {
  /* Will be styled in parent */
}

.time-aware-upcoming {
  /* Will be styled in parent */
}

.time-aware-future {
  /* Will be styled in parent */
}
</style>
