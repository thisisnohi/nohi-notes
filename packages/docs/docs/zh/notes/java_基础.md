# Java基础

## Nio
> 参考: http://ifeve.com/overview/

### ByteBuffer
```
	RandomAccessFile aFile = new RandomAccessFile( file, "rw" );
	FileChannel inChannel = aFile.getChannel();
	ByteBuffer buf = ByteBuffer.allocate( 1024 );
	int bytesRead = -1;
	StringBuffer sb = new StringBuffer();
	while ((bytesRead = inChannel.read( buf )) != -1) {
	  System.out.println( "bytesRead:" + bytesRead );
	  buf.flip();
	  sb.append( Charset.forName( "UTF-8" ).decode( buf ) );
	  buf.clear();
	  bytesRead = inChannel.read( buf );
	}
```
输出buffer内容前必须调用flip()
再次从channel中读取内容到buffer前，需要clear()。

#### 使用Buffer读写数据一般遵循以下四个步骤：
* 写入数据到Buffer
* 调用flip()方法
* 从Buffer中读取数据
* 调用clear()方法或者compact()方法
