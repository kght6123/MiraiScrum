<template>
  <div>
    <div v-for="item in items" :key="item.id" class="mb-2">
      <!--吹き出しはじまり-->
      <div v-if="!item.my" class="balloon-left">
        <div class="faceicon">
          <img src="/avater-1.png" :alt="item.name" />
        </div>
        <div class="chatting">
          <div class="says-left">
            <p>{{ item.message }}</p>
          </div>
        </div>
      </div>
      <!--吹き出し終わり-->
      <!--吹き出しはじまり-->
      <div v-if="item.my" class="balloon-right">
        <div class="chatting">
          <div class="says-right">
            <p>{{ item.message }}</p>
          </div>
        </div>
        <div class="faceicon">
          <img src="/avater-2.png" :alt="item.name" />
        </div>
      </div>
      <!--吹き出し終わり-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type     : Array,
      require  : false,
      default: () => []
    },
  }
}
</script>

<style scoped>
.balloon-left .faceicon img {
	border: solid 3px #FCE4EC;
	border-radius: 50%;
}
.balloon-right .faceicon img {
	border: solid 3px #E8EAF6;
	border-radius: 50%;
}
.says-left {
	border-radius: 20px;
	background: #EC407A;
	color: #FCE4EC;
}
.says-right {
	border-radius: 20px;
	background: #5C6BC0;
	color: #E8EAF6;
}
.says-left:after {
	border: 12px solid transparent;
	border-right: 12px solid #EC407A;
}
.says-right:after {
	border: 12px solid transparent;
	border-right: 12px solid #5C6BC0;
}

.balloon-left, .balloon-right {
	position:relative;
	width: 100%;
	min-height: 70px;
}
.balloon-left .faceicon, .balloon-right .faceicon {
	width: 80px;
	height: 80px;
}
.balloon-left .faceicon {
	position: absolute;
	top: 0;
	left: 0.25em;
}
.balloon-right .faceicon {
	position: absolute;
	top: 0;
	right: 0.25em;
}
.balloon-left .faceicon img, .balloon-right .faceicon img {
	width: 100%;
	height: 100%;
}
.says-left, .says-right {
	padding: 17px 13px;
	word-break: break-all;
}
.says-left {
	position: absolute;
	left: 115px;
}
.says-right {
	position: absolute;
	right: 115px;
}
.says-left:after, .says-right:after {
	content: "";
	position: absolute;
}
.says-left:after {
	top: 15px;
	left: -22px;
}
.says-right:after {
	top: 15px;
	right: -22px;
	transform: rotate(180deg);
}
.says-left p, .says-right p {
	margin: 0;
	padding: 0;
}
</style>