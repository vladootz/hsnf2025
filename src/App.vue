<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <header class="bg-blue-950 text-white p-4">
      <div class="container mx-auto flex justify-between items-center flex-wrap gap-2">
        <h1 class="text-xl font-bold">{{ t.title }}</h1>
        <div class="flex gap-2 items-center">
          <div class="hidden md:flex gap-2">
            <button
              @click="showNowOnly = !showNowOnly"
              :class="['px-4 py-2 rounded', showNowOnly ? 'bg-green-600' : 'bg-blue-800 hover:bg-blue-700']"
            >
              {{ nowButtonText }}
            </button>
            <button
              @click="columnsView = 3"
              :class="['px-4 py-2 rounded', columnsView === 3 ? 'bg-blue-600' : 'bg-blue-800 hover:bg-blue-700']"
            >
              {{ t.columns3 }}
            </button>
            <button
              @click="columnsView = 5"
              :class="['px-4 py-2 rounded', columnsView === 5 ? 'bg-blue-600' : 'bg-blue-800 hover:bg-blue-700']"
            >
              {{ t.columns5 }}
            </button>
            <button
              @click="toggleDemo"
              :class="['px-4 py-2 rounded', demoMode ? 'bg-purple-600' : 'bg-blue-800 hover:bg-blue-700']"
            >
              {{ t.demo }}
            </button>
          </div>
          <!-- Language Switcher -->
          <button
            @click="toggleLanguage"
            class="px-3 py-2 rounded bg-blue-800 hover:bg-blue-700 text-sm font-semibold"
            :title="currentLanguage === 'en' ? 'Switch to Japanese' : '英語に切り替え'"
          >
            {{ t.languageButton }}
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile bottom button bar -->
    <div
      class="md:hidden fixed bottom-0 left-0 right-0 bg-blue-950 backdrop-blur-sm p-3 z-50 mobile-bar"
      style="padding-bottom: max(0.75rem, env(safe-area-inset-bottom));"
    >
      <div class="relative w-full flex items-center">
        <!-- Left arrow -->
        <button
          v-show="buttonAlignment === 'right'"
          @click="toggleAlignment"
          class="arrow-btn absolute left-0 px-2 py-2 text-gray-300 hover:text-white text-xl"
          :aria-label="t.ariaLabels.moveLeft"
        >
          ←
        </button>

        <!-- Button group that slides -->
        <div :class="['button-group flex gap-2', buttonAlignment === 'left' ? 'align-left' : 'align-right']">
          <button
            @click="showNowOnly = !showNowOnly"
            :class="['px-3 py-2 rounded text-sm', showNowOnly ? 'bg-green-600' : 'bg-blue-800 hover:bg-blue-700']"
          >
            {{ nowButtonText }}
          </button>
          <button
            @click="toggleDemo"
            :class="['px-3 py-2 rounded text-sm', demoMode ? 'bg-purple-600' : 'bg-blue-800 hover:bg-blue-700']"
          >
            {{ t.demo }}
          </button>
        </div>

        <!-- Right arrow -->
        <button
          v-show="buttonAlignment === 'left'"
          @click="toggleAlignment"
          class="arrow-btn absolute right-0 px-2 py-2 text-gray-300 hover:text-white text-xl"
          :aria-label="t.ariaLabels.moveRight"
        >
          →
        </button>
      </div>
    </div>

    <main class="container mx-auto px-4 py-8 md:pb-8 pb-20">
      <div :class="['grid gap-6', showNowOnly ? 'grid-cols-1' : (columnsView === 3 ? 'md:grid-cols-3' : 'md:grid-cols-5'), 'grid-cols-1']">
        <div
          v-for="event in displayedEvents"
          :key="event.date"
          class="mb-6"
          :class="{ 'current-day': !showNowOnly && isCurrentOrFirstDay(event.date) }"
        >
          <div class="flex flex-col gap-4">
            <div class="text-center md:text-left">
              <h2 class="text-xl font-bold mb-2">{{ currentLanguage === 'ja' && event.date_ja ? event.date_ja : event.date }}</h2>
              <p v-if="event.registrationDeadline" class="text-gray-400 text-xs">{{ t.deadline }}: {{ currentLanguage === 'ja' && event.registrationDeadline_ja ? event.registrationDeadline_ja : event.registrationDeadline }}</p>
            </div>

            <div v-for="dailyEvent in event.events" :key="dailyEvent.time" class="mb-4">
              <TimeAware
                v-if="dailyEvent.startTime && dailyEvent.endTime"
                :start-time="dailyEvent.startTime"
                :end-time="dailyEvent.endTime"
                :data-lang="currentLanguage"
                @state-changed="handleStateChange($event, `${event.date}-${dailyEvent.time}`)"
              >
                <div :ref="el => setEventRef(el, `${event.date}-${dailyEvent.time}`)" class="bg-gray-800 p-4 rounded-lg h-full event-card" :data-lang="currentLanguage">
                  <div>
                    <p class="text-gray-400 text-sm">{{ dailyEvent.time }}</p>
                    <h3 class="text-base font-semibold mt-2">
                      {{ currentLanguage === 'ja' && dailyEvent.title_ja ? dailyEvent.title_ja : dailyEvent.title }}
                    </h3>
                    <p class="text-gray-400 text-xs mt-2 whitespace-pre-line">{{ currentLanguage === 'ja' && dailyEvent.description_ja ? dailyEvent.description_ja : dailyEvent.description }}</p>
                  </div>

                  <div class="mt-4 space-y-2 ">
                    <a
                      v-for="action in dailyEvent.actions"
                      :key="action.text"
                      :href="action.link"
                      target="_blank"
                      class="block w-full bg-gray-700 hover:bg-gray-600 text-gray-100 py-2 px-4 rounded transition-colors"
                    >
                      {{ currentLanguage === 'ja' && action.text_ja ? action.text_ja : action.text }}
                    </a>
                  </div>
                </div>
              </TimeAware>
              <div v-else class="bg-gray-800 p-4 rounded-lg h-full">
                <div>
                  <p class="text-gray-400 text-sm">{{ dailyEvent.time }}</p>
                  <h3 class="text-base font-semibold mt-2">{{ currentLanguage === 'ja' && dailyEvent.title_ja ? dailyEvent.title_ja : dailyEvent.title }}</h3>
                  <p class="text-gray-400 text-xs mt-2 whitespace-pre-line">{{ currentLanguage === 'ja' && dailyEvent.description_ja ? dailyEvent.description_ja : dailyEvent.description }}</p>
                </div>

                <div class="mt-4 space-y-2 ">
                  <a
                    v-for="action in dailyEvent.actions"
                    :key="action.text"
                    :href="action.link"
                    target="_blank"
                    class="block w-full bg-gray-700 hover:bg-gray-600 text-gray-100 py-2 px-4 rounded transition-colors"
                  >
                    {{ currentLanguage === 'ja' && action.text_ja ? action.text_ja : action.text }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-800 text-center py-6 px-4 pb-20">
      <div class="max-w-3xl mx-auto space-y-3">
        <p class="text-sm text-gray-400 font-semibold">
          {{ t.footer.disclaimer }}
        </p>
        <p class="text-xs text-gray-400">
          {{ t.footer.copyright }}
        </p>
        <p class="text-sm text-gray-400">
          {{ t.footer.checkOfficial }}
          <a href="https://digitalnomadshiroshima.com/hsnf2025/" target="_blank" class="text-blue-400 hover:underline">{{ t.footer.eventLink }}</a>
          <template v-if="currentLanguage === 'en'">and the event's WhatsApp group.</template>
        </p>
        <p class="text-xs text-gray-500 pt-2 border-t border-gray-700">
          {{ t.footer.developed }} <a href="https://websqu.ad" target="_blank" class="text-blue-400 hover:underline">websqu.ad</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import eventsData from './data/events.json'
import TimeAware from './components/TimeAware.vue'

export default {
  components: {
    TimeAware
  },
  setup() {
    const events = ref(eventsData.events)
    const columnsView = ref(5)
    const showNowOnly = ref(false)
    const currentTime = ref(new Date().getTime())
    const demoMode = ref(false)
    const demoDay = ref(null)
    const buttonAlignment = ref('right') // Default to right

    // Language state with localStorage persistence
    const currentLanguage = ref(localStorage.getItem('language') || 'en')

    // Toggle language function
    const toggleLanguage = () => {
      currentLanguage.value = currentLanguage.value === 'en' ? 'ja' : 'en'
      localStorage.setItem('language', currentLanguage.value)
    }

    // Translation objects
    const translations = {
      en: {
        title: 'Hiroshima Setouchi Nomad Fest 2025',
        firstDay: 'First day',
        now: 'Now',
        columns3: '3 Columns',
        columns5: '5 Columns',
        demo: 'Demo',
        deadline: 'Deadline',
        languageButton: 'JP',
        footer: {
          disclaimer: 'This page is generated by AI and is NOT affiliated with Hiroshima Setouchi Nomad Fest.',
          copyright: 'All content, event information, and imagery are copyright of their respective owners. This is an unofficial informational page.',
          checkOfficial: 'Please check the official sources for up-to-date information:',
          eventLink: 'Hiroshima Setouchi Nomad Fest 2025',
          developed: 'Developed with Claude by'
        },
        badges: {
          liveNow: 'LIVE NOW',
          upcoming: 'UPCOMING'
        },
        ariaLabels: {
          moveLeft: 'Move buttons left',
          moveRight: 'Move buttons right'
        }
      },
      ja: {
        title: '広島瀬戸内ノマドフェス 2025',
        firstDay: '初日',
        now: '現在',
        columns3: '3列',
        columns5: '5列',
        demo: 'デモ',
        deadline: '締切',
        languageButton: 'EN',
        footer: {
          disclaimer: 'このページはAIによって生成されており、広島瀬戸内ノマドフェストとは関係ありません。',
          copyright: 'すべてのコンテンツ、イベント情報、画像はそれぞれの所有者の著作権に帰属します。これは非公式の情報ページです。',
          checkOfficial: '最新情報は公式ソースをご確認ください：',
          eventLink: '広島瀬戸内ノマドフェス 2025',
          developed: 'Claude と websqu.ad により開発'
        },
        badges: {
          liveNow: 'ライブ中',
          upcoming: 'まもなく'
        },
        ariaLabels: {
          moveLeft: 'ボタンを左に移動',
          moveRight: 'ボタンを右に移動'
        }
      }
    }

    // Translation helper
    const t = computed(() => translations[currentLanguage.value])

    // Track event refs for scrolling
    const eventRefs = new Map()

    // Update current time every 2 seconds to keep button text reactive
    let timeUpdateInterval = null

    // Set event ref for tracking
    const setEventRef = (el, key) => {
      if (el) {
        eventRefs.set(key, el)
      } else {
        eventRefs.delete(key)
      }
    }

    // Scroll to event smoothly, centered in viewport
    const scrollToEvent = (eventKey) => {
      const element = eventRefs.get(eventKey)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }

    // Handle state change from TimeAware component
    const handleStateChange = (event, eventKey) => {
      if (event.state === 'current') {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          scrollToEvent(eventKey)
        }, 100)
      }
    }

    // Check for current events on mount and scroll to first one
    const scrollToCurrentEventOnLoad = () => {
      const now = new Date().getTime()

      // Check all events (including demo events if active)
      const eventsToCheck = demoMode.value && demoDay.value
        ? [demoDay.value, ...events.value]
        : events.value

      for (const dayEvent of eventsToCheck) {
        for (const event of dayEvent.events) {
          if (event.startTime && event.endTime) {
            const start = new Date(event.startTime).getTime()
            const end = new Date(event.endTime).getTime()

            if (now >= start && now <= end) {
              const eventKey = `${dayEvent.date}-${event.time}`
              scrollToEvent(eventKey)
              return // Only scroll to first current event
            }
          }
        }
      }
    }

    // Toggle button alignment between left and right
    const toggleAlignment = () => {
      buttonAlignment.value = buttonAlignment.value === 'right' ? 'left' : 'right'
    }

    // Watch for language changes and update HTML lang attribute and page title
    watch(currentLanguage, (newLang) => {
      document.documentElement.lang = newLang
      document.title = t.value.title
    }, { immediate: true })

    onMounted(() => {
      timeUpdateInterval = setInterval(() => {
        currentTime.value = new Date().getTime()
      }, 2000)

      // Scroll to current event on initial load (with delay for DOM rendering)
      setTimeout(() => {
        scrollToCurrentEventOnLoad()
      }, 200)
    })

    onBeforeUnmount(() => {
      if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval)
      }
    })

    // Generate demo events function
    const generateDemoEvents = () => {
      const now = new Date()
      const demoEvents = []

      // Create 5 events, each 20 seconds long
      for (let i = 0; i < 5; i++) {
        const startTime = new Date(now.getTime() + i * 20000) // 20 seconds apart
        const endTime = new Date(startTime.getTime() + 20000) // 20 seconds duration

        const formatTime = (date) => {
          return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        }

        demoEvents.push({
          time: formatTime(startTime),
          title: `Demo Event ${i + 1}`,
          title_ja: `デモイベント ${i + 1}`,
          description: `Testing time-aware functionality - 20 second duration\nStarts: ${formatTime(startTime)}\nEnds: ${formatTime(endTime)}`,
          description_ja: `時間認識機能のテスト - 20秒間\n開始: ${formatTime(startTime)}\n終了: ${formatTime(endTime)}`,
          actions: [],
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString()
        })
      }

      const dateLabel = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      const dateLabelJa = now.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })

      return {
        date: `Demo (${dateLabel})`,
        date_ja: `デモ (${dateLabelJa})`,
        events: demoEvents
      }
    }

    // Toggle demo mode
    const toggleDemo = () => {
      window.scrollTo(0,0);
      demoMode.value = !demoMode.value
      if (demoMode.value) {
        demoDay.value = generateDemoEvents()
      } else {
        demoDay.value = null
      }
    }

    // Check if any event is currently happening
    const hasCurrentEvent = computed(() => {
      const now = currentTime.value
      return events.value.some(dayEvent =>
        dayEvent.events.some(event => {
          if (!event.startTime || !event.endTime) return false
          const start = new Date(event.startTime).getTime()
          const end = new Date(event.endTime).getTime()
          return now >= start && now <= end
        })
      )
    })

    // Button text changes based on whether events have started
    const nowButtonText = computed(() => {
      return hasCurrentEvent.value ? t.value.now : t.value.firstDay
    })

    // Parse event date to compare with current date
    const parseEventDate = (dateString) => {
      // Parse "October 18 (Sat)" format
      const match = dateString.match(/(\w+)\s+(\d+)/)
      if (!match) return null

      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
      const month = monthNames.indexOf(match[1])
      const day = parseInt(match[2])

      // Assuming 2025 based on the event
      return new Date(2025, month, day)
    }

    // Get current or first day to display
    const getCurrentOrFirstDay = () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Find if today matches any event date
      const todayEvent = events.value.find(event => {
        const eventDate = parseEventDate(event.date)
        return eventDate && eventDate.getTime() === today.getTime()
      })

      if (todayEvent) return todayEvent

      // If today is before all events, return first event
      const firstEvent = events.value[0]
      const firstEventDate = parseEventDate(firstEvent.date)

      if (firstEventDate && today < firstEventDate) {
        return firstEvent
      }

      // If during the event period, find the next upcoming day
      for (const event of events.value) {
        const eventDate = parseEventDate(event.date)
        if (eventDate && eventDate >= today) {
          return event
        }
      }

      // If all events have passed, return the last event
      return events.value[events.value.length - 1]
    }

    // Computed property for displayed events
    const displayedEvents = computed(() => {
      let eventsToShow = events.value

      // Add demo day at the beginning if demo mode is active
      if (demoMode.value && demoDay.value) {
        eventsToShow = [demoDay.value, ...events.value]
      }

      if (showNowOnly.value) {
        const currentDay = getCurrentOrFirstDay()
        return currentDay ? [currentDay] : []
      }
      return eventsToShow
    })

    // Check if a date is the current or first day
    const isCurrentOrFirstDay = (dateString) => {
      const currentDay = getCurrentOrFirstDay()
      return currentDay && currentDay.date === dateString
    }

    return {
      events,
      columnsView,
      showNowOnly,
      displayedEvents,
      isCurrentOrFirstDay,
      nowButtonText,
      demoMode,
      toggleDemo,
      buttonAlignment,
      toggleAlignment,
      setEventRef,
      handleStateChange,
      currentLanguage,
      toggleLanguage,
      t
    }
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
.grid.gap-6 > .mb-6.current-day {
  background-color: rgba(55, 65, 81, 0.75);
  border-radius: 0.5rem;
  padding: 0.5rem;
}
.grid.gap-6 > .mb-6 {
  background-color: rgba(55, 65, 81, 0.15);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

/* Time-aware states */
.time-aware-current .event-card {
  background: linear-gradient(135deg, #1a2520 0%, #151b18 100%) !important;
  border-left: 4px solid #4ade80;
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.1);
  position: relative;
}

.time-aware-current .event-card::before {
  content: "LIVE NOW";
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #4ade80;
  color: #0f172a;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.time-aware-current .event-card[data-lang="ja"]::before {
  content: "ライブ中";
}

.time-aware-current .event-card h3 {
  color: #86efac;
}

.time-aware-upcoming .event-card {
  border-left: 4px solid #fbbf24;
  background: linear-gradient(135deg, #2a2410 0%, #1a1a1a 100%) !important;
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.15);
}

.time-aware-upcoming .event-card::before {
  content: "UPCOMING";
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #fbbf24;
  color: #000;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.time-aware-upcoming .event-card[data-lang="ja"]::before {
  content: "まもなく";
}

.time-aware-past .event-card {
  opacity: 0.5;
  filter: grayscale(0.5);
}

.time-aware-past .event-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  border-radius: 0.5rem;
}

.event-card {
  position: relative;
  transition: all 0.3s ease;
}

/* Mobile button bar animations */
.mobile-bar .button-group {
  transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
}

/* Buttons slide right when aligned right */
.mobile-bar .button-group.align-right {
  margin-left: auto;
  margin-right: 0;
}

/* Buttons slide left when aligned left */
.mobile-bar .button-group.align-left {
  margin-left: 0;
  margin-right: auto;
}

/* Arrows fade in/out */
.mobile-bar .arrow-btn {
  transition: opacity 0.2s ease;
}
</style>
