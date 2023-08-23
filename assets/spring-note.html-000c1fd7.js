import{_ as e,p as n,q as i,a1 as t}from"./framework-449724a9.js";const a={},d=t(`<h1 id="spring-note" tabindex="-1"><a class="header-anchor" href="#spring-note" aria-hidden="true">#</a> spring note</h1><blockquote><p>create by nohi 20200614</p></blockquote><h2 id="xml" tabindex="-1"><a class="header-anchor" href="#xml" aria-hidden="true">#</a> XML</h2><ul><li>DefaultBeanDefinitionDocumentReader.processBeanDefinition()</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>line 311
protected void processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate) {
		BeanDefinitionHolder bdHolder = delegate.parseBeanDefinitionElement(ele);
		if (bdHolder != null) {
			bdHolder = delegate.decorateBeanDefinitionIfRequired(ele, bdHolder);
			try {
				// Register the final decorated instance.
				BeanDefinitionReaderUtils.registerBeanDefinition(bdHolder, getReaderContext().getRegistry());
			}
			catch (BeanDefinitionStoreException ex) {
				getReaderContext().error(&quot;Failed to register bean definition with name &#39;&quot; +
						bdHolder.getBeanName() + &quot;&#39;&quot;, ele, ex);
			}
			// Send registration event.
			getReaderContext().fireComponentRegistered(new BeanComponentDefinition(bdHolder));
		}
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>解析xml，获得beanDefinition</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>AbstractBeanDefinition beanDefinition = parseBeanDefinitionElement(ele, beanName, containingBean);
  |
BeanDefinitionParserDelegate.parseBeanDefinitionElement() Line 500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,6),l=[d];function r(s,o){return n(),i("div",null,l)}const v=e(a,[["render",r],["__file","spring-note.html.vue"]]);export{v as default};
