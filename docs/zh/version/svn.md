# SVN NOTE

## 备份与恢复

    svnadmin dump E:\z_otherpath\svn_Repositories\A_NOHI > dump_A_NOHI
    svnadmin load E:\z_otherpath\svn_Repositories\A_NOHI < dump_A_NOHI



### 整个库dump一个文件

    svnadmin dump E:\z_otherpath\svn_Repositories\A_NOHI > dump_A_NOHI 

### 导入整个库

    svnadmin load E:\z_otherpath\svn_Repositories\A_NOHI < dump_A_NOHI

### 按版本号备份

* 备份0:23: 
        
  
      svnadmin dump E:\z_otherpath\svn_Repositories\A_NOHI -r 0:23  > dump_A_NOHI_0:23
  
* 备份24:33: 
  
      svnadmin dump E:\z_otherpath\svn_Repositories\A_NOHI -r 24:33 > dump_A_NOHI_24:33

* 按版本号导入
  
      svnadmin load E:\z_otherpath\svn_Repositories\A_NJCSP < dump_A_NOHI
      svnadmin dump E:\z_otherpath\svn_Repositories\A_NJCSP_LOCAL -r 0:295 > dump_A_NOHI_0-295

