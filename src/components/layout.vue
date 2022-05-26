<template>
    <div class="lay-container">
        <el-container>
            <el-aside width="200px">
                <el-row >
                    <el-col :span="24">
                        <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                            <div v-for="(route,index) in routes" :key="index">
                                <el-menu-item :index='`${(index+1).toString()}`' v-if="!route.children ||route.children.length <= 1" @click="gonext(route)">
                                    <i :class="route.children?route.children[0].meta.icon:route.meta.icon"></i>
                                    <span slot="title">{{route.children?route.children[0].meta.title:route.meta.title}}</span>
                                </el-menu-item>
                                <el-submenu :index="`${(index+1).toString()}`" v-else>
                                    <template slot="title">
                                        <i :class="route.meta.icon"></i>
                                        <span>{{route.meta.title}}</span>
                                    </template>
                                    <el-menu-item-group v-for="(child,index) in route.children" :key="index"  @click.native="gonext(child)">
                                        <el-menu-item  :index="'1-'+(++index)"> <i :class="child.meta.icon"></i><span>{{child.meta.title}}</span></el-menu-item>    
                                    </el-menu-item-group>
                                </el-submenu>

                            </div>
                        
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  name: "layout",
  data() {
      return {
         
      }
  },
  computed:{
      routes(){
          return this.$router.options.routes
      }
  },
  methods:{
      gonext(child){
          this.$router.push({name:child.name})
      }
  },
  mounted(){
      
  }
};
</script>

<style lang="scss">
.el-aside {
  height: 100vh;
  background-color: #545c64;
}
.el-menu-item,
.el-submenu {
  min-width: 200px;
}
</style>