<template>
  <div class="container" v-show="!isClose">
    <div class="container__inner">
      <div class="header">
        <div class="header-text">Напишите нам, мы онлайн</div>
        <img
          :src="require('@/assets/icons/close.png')"
          @click="closeModal"
          alt="close"
        />
      </div>
      <div class="container__main">
        <div class="container__main-chat" id="scrollElement">
          <div class="chats" v-for="item in messages" :key="item.date">
            <div class="chats-date">
              <span>{{ item.date }} ({{ item.count }} сообщений)</span>
            </div>
            <div class="chats__content">
              <template v-for="elem in item.messages" :key="elem.date">
                <div
                  v-if="elem.type === 'recipient'"
                  class="chats__content-recipient"
                >
                  <img :src="require('@/assets/icons/robot.png')" alt="robot" />
                  <p>{{ elem.text }}</p>
                </div>
                <div
                  v-if="elem.type === 'sender'"
                  class="chats__content-sender"
                >
                  <p>{{ elem.text }}</p>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="container__main-actions">
          <textarea
            ref="textarea"
            placeholder="Сообщение..."
            spellcheck="true"
            maxlength="4096"
            v-model="text"
          />
          <div class="container__main-actions-buttons">
            <img :src="require('@/assets/icons/smile.png')" alt="smile" />
            <img
              v-if="text.length"
              :src="require('@/assets/icons/send.png')"
              alt="send"
            />
            <img
              v-else
              :src="require('@/assets/icons/attachment.png')"
              alt="attachment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="button" @click="openModal"  v-show="isClose">
    <img :src="require('@/assets/icons/chat.png')" alt="chat" />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    text: "",
    isClose: true,
    chats: [
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "recipient",
        date: "2023-08-29T11:35:29.052Z",
      },
      {
        text: "Привет!",
        type: "sender",
        date: "2023-08-29T11:41:29.052Z",
      },
      {
        text: "Как дела?)",
        type: "sender",
        date: "2023-08-29T11:55:29.052Z",
      },
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "recipient",
        date: "2023-08-29T12:02:29.052Z",
      },
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "recipient",
        date: "2023-08-30T09:35:29.052Z",
      },
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "sender",
        date: "2023-08-30T09:47:29.052Z",
      },
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "recipient",
        date: "2023-08-30T10:11:29.052Z",
      },
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "recipient",
        date: "2023-08-31T09:35:29.052Z",
      },
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "sender",
        date: "2023-08-31T09:47:29.052Z",
      },
      {
        text: "Привет! Это менеджер Адиль. Наша команда поддержки онлайн по рабочим дням с 10:00 до 23:00 EEST. Я постараюсь вам помочь. Какой у вас вопрос?",
        type: "recipient",
        date: "2023-08-31T10:11:29.052Z",
      },
    ],
  }),
  computed: {
    messages() {
      const groupedMessages = {};
      function formatDate(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const messageDate = new Date(date);

        if (messageDate.toDateString() === today.toDateString()) {
          return "Сегодня";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
          return "Вчера";
        } else {
          const options = { day: "numeric", month: "long" };
          return messageDate.toLocaleDateString("ru-RU", options);
        }
      }
      // Перебираем сообщения и группируем их по датам
      this.chats.forEach((message) => {
        const messageDate = new Date(message.date);
        const dateString = formatDate(messageDate.toISOString().split("T")[0]);

        if (!groupedMessages[dateString]) {
          groupedMessages[dateString] = [];
        }

        // Приводим время к текущему часовому поясу (UTC+0 к вашему часовому поясу)
        const localTime = messageDate.toLocaleTimeString("ru-Ru", {
          timeZone: "Asia/Almaty", // Замените на свой часовой пояс
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        });

        const formattedMessage = {
          text: message.text,
          type: message.type,
          date: localTime,
        };

        groupedMessages[dateString].push(formattedMessage);
      });

      // Преобразовываем объект группированных сообщений в массив
      const result = Object.keys(groupedMessages).map((date) => ({
        date,
        count: groupedMessages[date].length,
        messages: groupedMessages[date],
      }));

      return result;
    },
  },
  methods: {
    openModal() {
      window.parent.postMessage(true, 'http://192.168.0.108:5500/index.html');
      this.isClose = false  
      setTimeout(() => {
        let objDiv = document.getElementById("scrollElement");
        objDiv.scrollTop = objDiv.scrollHeight;        
      }, 100);
    },
    closeModal() {
      window.parent.postMessage(false, 'http://192.168.0.108:5500/index.html');
      this.isClose = true   
    }
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
