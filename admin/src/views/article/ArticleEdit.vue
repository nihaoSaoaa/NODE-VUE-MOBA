<template>
  <div class="category-edit">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px"  @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.category">
          <el-option
            v-for="item in newsCategories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor  v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    {{model}}
  </div>
</template>

<script>
import { categories } from '../../common/mixin'
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    id: {
      type: String
    },
  },
  data() {
    return {
      model: {},
    }
  },
  components: {
    VueEditor,
  },
  mixins: [ categories ],
  computed: {
    newsCategories() {
      return this.categories.filter( category => category.parent && category.parent.name === '新闻资讯' ) 
    }
  },
  created () {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      let res = '';
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/articles', this.model);
      }
      if (res) {
        this.$router.push('/articles/list')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      }
    },
    async fetch(){
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
}
</script>

