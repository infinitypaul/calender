<template>
  <article id="calendar">
    <header>
      <div class="current-date">
        <div class="current-day">
          {{ weekdayNames[currentDay] }}
        </div>
        <div class="today">
          <div><div class="arrow-up" @click="dateUp()"></div></div>
          <div><div class="arrow-up" @click="monthUp()"></div></div>
          <div><div class="arrow-up" @click="currentDate.year += 1"></div></div>
          <div>{{ currentDate.date }}</div>
          <div>{{ month[currentDate.month] }}</div>
          <div>{{ currentDate.year }}</div>
          <div>
            <div class="arrow-down" @click="dateDown()"></div>
          </div>
          <div><div class="arrow-down" @click="monthDown()"></div></div>
          <div><div class="arrow-down" @click="currentDate.year -= 1"></div></div>
        </div>
      </div>
    </header>
    <section>
      <div class="event">
        <div class="item">
          <div class="current-day">
            {{ weekdayNames[currentDay] }}
          </div>
        </div>
        <div class="add" @click="setEvent">Add Event</div>
      </div>
      <div class="weekdays">
        <div class="weekday" v-for="(weekday, index) in weekdays" :key="index">
          {{ weekday }}
        </div>
      </div>
      <div class="date">
        <div class="day-hidden" v-for="(n, index) in (firstMonthDay -1)" :key="'prev'+index">
          {{ (prevMonthDays +1) - firstMonthDay + n }}
        </div>
        <div class="day"
             :class="{ active: n === currentDate.date}"
             @click="seeEvent(n)"
             v-for="(n, index) in currentMonthDays"
             :key="'day'+index">
          {{ n }}  <div class="dot-holder">
          <span class="dot" v-for="(me, index) in insertEvent(n)" :key="index">.</span>
        </div>
        </div>
        <div class="day-hidden" v-for="(n, index) in (43 - (currentMonthDays + firstMonthDay))" :key="'next'+index">
          {{ n }}
        </div>
      </div>
    </section>
    <ViewEvent :currentDate="currentDate" />
  </article>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ViewEvent from "../components/Modals/Modal/ViewEvent";
  export default {
    data: function() {
      return {
        weekdays: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
        weekdayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        month: [
          'January','February','March','April','May','June','July',
          'August','September','October','November','December'
        ],
        currentDate: {
          date: 0,
          month: 0,
          year: 0
        }
      }
    },
    components:{
      ViewEvent
    },
    computed: {
      prevMonthDays() {
        let year = this.currentDate.month === 0 ? this.currentDate.year - 1 : this.currentDate.year;
        let month = this.currentDate.month === 0 ? 12 : this.currentDate.month;
        return new Date(year, month, 0).getDate();
      },
      firstMonthDay() {
        let firstDay = new Date(this.currentDate.year, this.currentDate.month, 1).getDay();
        if(firstDay === 0) firstDay = 7;
        return firstDay;
      },
      currentDay() {
        return new Date(this.currentDate.year, this.currentDate.month, this.currentDate.date).getDay();
      },
      currentMonthDays() {
        return  new Date(this.currentDate.year, this.currentDate.month +1, 0).getDate();

      },
      ...mapGetters({
        bookings : 'reservation/bookings'
      })

    },
    methods: {
      seeEvent(n){
        this.currentDate.date = n
        this.$modal.show('viewEvent', { name : `${this.weekdayNames[this.currentDay]} ${this.currentDate.date} - ${this.month[this.currentDate.month]} - ${this.currentDate.year}`})
      },
      insertEvent(n){
        const EventDate = `${this.currentDate.year}-${this.currentDate.month}-${n}`;
        return this.bookings.map((eve, index) => eve.date === EventDate ? index : '').filter(String);
      },
      ...mapActions({
        getReservations: 'reservation/getReservations',
      }),
      getCurrentDate() {
        let today = new Date();
        this.currentDate.date = today.getDate();
        this.currentDate.month = today.getMonth();
        this.currentDate.year = today.getFullYear();
      },
      dateUp() {
        if(this.currentDate.date === this.currentMonthDays) {
          this.currentDate.date = 1;
          this.monthUp();
        }
        else {
          this.currentDate.date += 1;
        }
      },
      dateDown() {
        if(this.currentDate.date === 1) {
          this.currentDate.date = this.prevMonthDays;
          this.monthDown();
        }
        else {
          this.currentDate.date -= 1;
        }
      },
      monthUp() {
        if(this.currentDate.month === 11) {
          this.currentDate.month = 0;
          this.currentDate.year += 1;
        }
        else {
          this.currentDate.month += 1;
        }
      },
      monthDown() {
        if(this.currentDate.month === 0) {
          this.currentDate.month = 11;
          this.currentDate.year -= 1;
        }
        else {
          this.currentDate.month -= 1;
        }
      },
      setEvent(){
        this.$modal.show('reserve', { name : "Book A Date"})
      }
    },
    created() {
      this.getCurrentDate();
    },
    mounted() {
      this.getReservations()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Anton');
  @mixin calendar-layout($property) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-gap: 10px;
    padding: $property;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      color: #fff;
      border-radius: 5px;
    }
  }

  @mixin arrow-style() {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    cursor: pointer;
  }
  #calendar {
    width: 460px;
    height: 730px;
    background-color: #304357;
    font-family: 'Anton';
    border-radius: 15px;
    overflow: hidden;
    background-size: cover;
    user-select: none;
    .dot {
      position: relative;
      height: max-content;
    }
    .add {
      cursor: pointer;
    }
    header {
      display: flex;
      justify-content: center;
      align-items: top;
      height: 400px;
      padding: 20px 0 0;
      text-align: center;
      overflow: hidden;
      color: #efefef;
      text-shadow: 1px 1px 1px #222,
      1px -1px 1px #222,
      -1px 1px 1px #222,
      -1px -1px 1px #222;
      .current-date {
        width: 300px;
      }
      .arrow-up {
        @include arrow-style();
        border-bottom: 10px solid #fff;
        &:hover {
          border-bottom: 10px solid rgba(0,0,0,.4);
        }
      }
      .arrow-down {
        @include arrow-style();
        border-top: 10px solid #fff;
        &:hover {
          border-top: 10px solid rgba(0,0,0,.4);
        }
      }
      .today {
        display: grid;
        grid-template-columns: 40px auto 70px;
        grid-gap: 0;
        div {
          display: flex;
          justify-content: center;
          padding: 5px;
        }
      }
      .current-day {
        font-size: 4rem;
      }
      .today {
        font-size: 2rem;
      }
    }
    .weekdays {
      @include calendar-layout(10px 20px 10px);
      background-color: rgba(0,0,0,.5);
      border-bottom: 1px solid #fff;
      div:nth-child(7n) {
        color: #D43541;
      }
    }
    .event {
      @include calendar-layout(10px 20px 10px);
      background-color: rgba(0,0,0,.5);
      border-bottom: 1px solid #fff;
    }
    .date {
      @include calendar-layout(10px 20px 20px);
      background-color: rgba(0,0,0,.7);
      .active {
        background-color: #fff;
        color: #2A4C50;
        .dot-holder{
          color: #222;
        }
      }
      .day {
        display: flex;
        flex-direction: column;
        align-content: space-around;
        cursor: pointer;
        .dot-holder{
          height: 5px;
        }
        &:hover {
          background-color: #fff;
          color: #2A4C50;
          .dot-holder{
            color: #222;
          }
        }
        &:nth-child(7n) {
          color: #D43541;
          &:hover {
            background-color: #fff;
            color: #D43541;
          }
        }

      }
      .day-hidden {
        opacity: .4;
        &:nth-child(7n) {
          color: #D43541;
        }
      }
    }
  }
</style>