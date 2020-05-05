/*
 * @Descripttion:
 * @Author: octopus
 * @Date: 2020-04-23 16:34:21
 * @LastEditors: voanit
 * @LastEditTime: 2020-05-04 16:43:12
 */
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  Vue.use(Element, {
    locale
  })
}
