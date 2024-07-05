# ApacheBench（ab）

>  web压测工具

ab 命令对发出负载的计算机要求很低，既不会占用很高 CPU，也不会占用很多内存，但却会给目标服务器造成巨大的负载，其原理类似 CC 攻击。自己测试使用也须注意，否则一次上太多的负载，可能造成目标服务器因资源耗完，严重时甚至导致死机。

## ApacheBench 参数说明

```shell
ab [ -A auth-username:password ] [ -b windowsize ] [ -B local-address ] [ -c concurrency ] [ -C cookie-name=value ] [ -d ] [ -e csv-file ] [ -f protocol ] [ -g gnuplot-file ] [ -h ] [ -H custom-header ] [ -i ] [ -k ] [ -l ] [ -m HTTP-method ] [ -n requests ] [ -p POST-file ] [ -P proxy-auth-username:password ] [ -q ] [ -r ] [ -s timeout ] [ -S ] [ -t timelimit ] [ -T content-type ] [ -u PUT-file ] [ -v verbosity] [ -V ] [ -w ] [ -x
-attributes ]
 [ -X proxy[:port] ] [ -y-attributes ] [ -z-attributes ] [ -Z ciphersuite ] [http[s]://]hostname[:port]/path
 
 ab [options] [http[s]://]hostname[:port]/path
```

```
Options are:
    // 在测试会话中所执行的请求个数（本次测试总共要访问页面的次数）。默认时，仅执行一个请求。
    -n requests     Number of requests to perform  
    // 一次产生的请求个数（并发数）。默认是一次一个。
    -c concurrency  Number of multiple requests to make at a time
    -t timelimit    Seconds to max. to spend on benchmarking
                    This implies -n 50000
    -s timeout      Seconds to max. wait for each response
                    Default is 30 seconds
    -b windowsize   Size of TCP send/receive buffer, in bytes
    -B address      Address to bind to when making outgoing connections
    // POST 的数据的文件，文件格式如“p1=1&p2=2”.使用方法是 -p 111.txt 。 （配合-T）
    -p postfile     File containing data to POST. Remember also to set -T
    -u putfile      File containing data to PUT. Remember also to set -T
    // Content-type 头信息，如 -T “application/x-www-form-urlencoded” 
    -T content-type Content-type header to use for POST/PUT data, eg.
                    'application/x-www-form-urlencoded'
                    Default is 'text/plain'
    -v verbosity    How much troubleshooting info to print
    -w              Print out results in HTML tables
    -i              Use HEAD instead of GET
    -x attributes   String to insert as table attributes
    -y attributes   String to insert as tr attributes
    -z attributes   String to insert as td or th attributes
    -C attribute    Add cookie, eg. 'Apache=1234'. (repeatable)
    -H attribute    Add Arbitrary header line, eg. 'Accept-Encoding: gzip'
                    Inserted after all normal header lines. (repeatable)
    -A attribute    Add Basic WWW Authentication, the attributes
                    are a colon separated username and password.
    -P attribute    Add Basic Proxy Authentication, the attributes
                    are a colon separated username and password.
    -X proxy:port   Proxyserver and port number to use
    -V              Print version number and exit
    -k              Use HTTP KeepAlive feature
    -d              Do not show percentiles served table.
    -S              Do not show confidence estimators and warnings.
    -q              Do not show progress when doing more than 150 requests
    -l              Accept variable document length (use this for dynamic pages)
    -g filename     Output collected data to gnuplot format file.
    -e filename     Output CSV file with percentages served
    -r              Don't exit on socket receive errors.
    -m method       Method name
    -h              Display usage information (this message)
    -I              Disable TLS Server Name Indication (SNI) extension
    -Z ciphersuite  Specify SSL/TLS cipher suite (See openssl ciphers)
    -f protocol     Specify SSL/TLS protocol
                    (TLS1, TLS1.1, TLS1.2 or ALL)
    -E certfile     Specify optional client certificate chain and private key
```

常用`ab -c 1000 -n 100 http://10.50.120.121/test/blank`

