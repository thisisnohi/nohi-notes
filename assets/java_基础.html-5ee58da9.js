import{_ as e,p as a,q as i,a1 as n}from"./framework-449724a9.js";const t={},l=n(`<h1 id="java基础" tabindex="-1"><a class="header-anchor" href="#java基础" aria-hidden="true">#</a> Java基础</h1><h2 id="nio" tabindex="-1"><a class="header-anchor" href="#nio" aria-hidden="true">#</a> Nio</h2><blockquote><p>参考: http://ifeve.com/overview/</p></blockquote><h3 id="bytebuffer" tabindex="-1"><a class="header-anchor" href="#bytebuffer" aria-hidden="true">#</a> ByteBuffer</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>	RandomAccessFile aFile = new RandomAccessFile( file, &quot;rw&quot; );
	FileChannel inChannel = aFile.getChannel();
	ByteBuffer buf = ByteBuffer.allocate( 1024 );
	int bytesRead = -1;
	StringBuffer sb = new StringBuffer();
	while ((bytesRead = inChannel.read( buf )) != -1) {
	  System.out.println( &quot;bytesRead:&quot; + bytesRead );
	  buf.flip();
	  sb.append( Charset.forName( &quot;UTF-8&quot; ).decode( buf ) );
	  buf.clear();
	  bytesRead = inChannel.read( buf );
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出buffer内容前必须调用flip() 再次从channel中读取内容到buffer前，需要clear()。</p><h4 id="使用buffer读写数据一般遵循以下四个步骤" tabindex="-1"><a class="header-anchor" href="#使用buffer读写数据一般遵循以下四个步骤" aria-hidden="true">#</a> 使用Buffer读写数据一般遵循以下四个步骤：</h4><ul><li>写入数据到Buffer</li><li>调用flip()方法</li><li>从Buffer中读取数据</li><li>调用clear()方法或者compact()方法</li></ul>`,8),r=[l];function d(s,u){return a(),i("div",null,r)}const f=e(t,[["render",d],["__file","java_基础.html.vue"]]);export{f as default};
