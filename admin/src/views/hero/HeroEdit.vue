<template>
  <div class="category-edit">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px"  @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">

        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="8">
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="authHeaders"
                  :show-file-list="false"
                  :on-success="res => $set(model, 'avatar', res.url)"
                >
                  <img v-if="model.avatar" :src="model.avatar" class="avatar el-uploader">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="model.categories" multiple >
                  <el-option
                    v-for="item in heroesCategories"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="物理攻击">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.physical"></el-rate>
              </el-form-item>
              <el-form-item label="魔法攻击">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.magic"></el-rate>
              </el-form-item>
              <el-form-item label="防御能力">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.defence"></el-rate>
              </el-form-item>
              <el-form-item label="上手难度">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="顺风出装">
                <el-select v-model="model.items1" multiple>
                  <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逆风出装">
                <el-select v-model="model.items2" multiple>
                  <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="背景故事">
            <el-input type="textarea" v-model="model.story"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col v-for="(skill, i) in model.skills" :key="i" :md="12" style="border-bottom: 1px solid #aaa;padding:15px 5px">
              <el-form-item label="名称">
                <el-input v-model="skill.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(skill, 'icon', res.url)"
                >
                  <img v-if="skill.icon" :src="skill.icon" class="avatar el-uploader">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="释放方式">
                <el-select v-model="skill.tips" >
                  <el-option v-for="(tip, i) in tips" :key="i" :label="tip" :value="tip"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="skill.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="skill.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="skill.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="danger" size="small" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="small" @click="model.partners.push({})">
            <i class="el-icon-plus"></i> 添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.partners" :key="i">
              <el-form-item label="搭档英雄">
                <el-select filterable v-model="item.hero">
                  <el-option 
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { categories, items, heroes } from '../../common/mixin'
export default {
  props: {
    id: {
      type: String
    },
  },
  data() {
    return {
      tips: ['被动技能', '快捷键：Q','快捷键：W','快捷键：E','快捷键：R',],
      model: {
        name: '',
        title: '',
        avatar: '',
        categories: [],
        scores: {},
        items1: [],
        items2: [],
        usageTips: '',
        battleTips: '',
        story: '',
        skills: [],
        partners: [],
      },
    }
  },
  mixins: [categories, items, heroes],
  computed: {
    heroesCategories() {
      return this.categories.filter( category => category.parent && category.parent.name === '英雄' ) 
    }
  },
  created () {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      let res = '';
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/heroes', this.model);
      }
      if (res) {
        this.$router.push('/heroes/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      }
    },
    async fetch(){
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = Object.assign({}, this.model, res.data);
    }
  },
}
</script>

<style>
</style>