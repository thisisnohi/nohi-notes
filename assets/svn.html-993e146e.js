import{_ as e,p as a,q as d,a1 as r}from"./framework-449724a9.js";const n={},t=r(`<h1 id="svn-note" tabindex="-1"><a class="header-anchor" href="#svn-note" aria-hidden="true">#</a> SVN NOTE</h1><h2 id="备份与恢复" tabindex="-1"><a class="header-anchor" href="#备份与恢复" aria-hidden="true">#</a> 备份与恢复</h2><pre><code>svnadmin dump E:\\z_otherpath\\svn_Repositories\\A_JSCCB &gt; dump_A_JSCCB 
svnadmin load E:\\z_otherpath\\svn_Repositories\\A_JSCCB &lt; dump_A_JSCCB
</code></pre><h3 id="整个库dump一个文件" tabindex="-1"><a class="header-anchor" href="#整个库dump一个文件" aria-hidden="true">#</a> 整个库dump一个文件</h3><pre><code>svnadmin dump E:\\z_otherpath\\svn_Repositories\\A_JSCCB &gt; dump_A_JSCCB 
</code></pre><h3 id="导入整个库" tabindex="-1"><a class="header-anchor" href="#导入整个库" aria-hidden="true">#</a> 导入整个库</h3><pre><code>svnadmin load E:\\z_otherpath\\svn_Repositories\\A_JSCCB &lt; dump_A_JSCCB
</code></pre><h3 id="按版本号备份" tabindex="-1"><a class="header-anchor" href="#按版本号备份" aria-hidden="true">#</a> 按版本号备份</h3><ul><li><p>备份0:23:</p><pre><code>svnadmin dump E:\\z_otherpath\\svn_Repositories\\A_NOHI -r 0:23  &gt; dump_A_NOHI_0:23
</code></pre></li><li><p>备份24:33:</p><pre><code>svnadmin dump E:\\z_otherpath\\svn_Repositories\\A_NOHI -r 24:33 &gt; dump_A_NOHI_24:33
</code></pre></li><li><p>按版本号导入</p><pre><code>svnadmin load E:\\z_otherpath\\svn_Repositories\\A_NJCSP &lt; dump_A_NOHI
svnadmin dump E:\\z_otherpath\\svn_Repositories\\A_NJCSP_LOCAL -r 0:295 &gt; dump_A_NOHI_0-295
</code></pre></li></ul>`,9),o=[t];function s(_,i){return a(),d("div",null,o)}const h=e(n,[["render",s],["__file","svn.html.vue"]]);export{h as default};
