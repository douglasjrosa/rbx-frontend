if(!self.define){let e,a={};const i=(i,c)=>(i=new URL(i+".js",c).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,b)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(a[d])return;let s={};const r=e=>i(e,d),n={module:{uri:d},exports:s,require:r};a[d]=Promise.all(c.map((e=>n[e]||r(e)))).then((e=>(b(...e),s)))}}define(["./workbox-5f5b08d6"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/3YqM0hRBCzzXZlPDeN-z1/_buildManifest.js",revision:"3b3d637fd6013f01d9cf5992048c3bfc"},{url:"/_next/static/3YqM0hRBCzzXZlPDeN-z1/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/3YqM0hRBCzzXZlPDeN-z1/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/141-c04d037ffec780cd.js",revision:"c04d037ffec780cd"},{url:"/_next/static/chunks/141-c04d037ffec780cd.js.map",revision:"90cb9c153567c1640dc815b08fe4f930"},{url:"/_next/static/chunks/framework-38f22d267257f62d.js",revision:"38f22d267257f62d"},{url:"/_next/static/chunks/framework-38f22d267257f62d.js.map",revision:"172e28b20523631157433e22bd5b19c8"},{url:"/_next/static/chunks/main-8f91f4a2fb76700a.js",revision:"8f91f4a2fb76700a"},{url:"/_next/static/chunks/main-8f91f4a2fb76700a.js.map",revision:"01d2abe07e10586004ef89de0301f8c7"},{url:"/_next/static/chunks/pages/%5B%5B...slug%5D%5D-6c7631b5e94a8791.js",revision:"6c7631b5e94a8791"},{url:"/_next/static/chunks/pages/%5B%5B...slug%5D%5D-6c7631b5e94a8791.js.map",revision:"3fb44d374aac401ea46125b97ec37703"},{url:"/_next/static/chunks/pages/_app-52f8f369def56c85.js",revision:"52f8f369def56c85"},{url:"/_next/static/chunks/pages/_app-52f8f369def56c85.js.map",revision:"914d4e36be7f73ecf9a4324483247044"},{url:"/_next/static/chunks/pages/_error-71bd0c3352b83370.js",revision:"71bd0c3352b83370"},{url:"/_next/static/chunks/pages/_error-71bd0c3352b83370.js.map",revision:"18578977ef8fd72afabbbaf8a30c3c49"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-a74cfed0a6d6c19f.js",revision:"a74cfed0a6d6c19f"},{url:"/_next/static/chunks/webpack-a74cfed0a6d6c19f.js.map",revision:"6689d95ad6ca8c60fd8feae173b115bf"},{url:"/_next/static/css/cf90a458f043e901.css",revision:"cf90a458f043e901"},{url:"/_next/static/css/cf90a458f043e901.css.map",revision:"2f5a82732362a490e84350f59dbdb5ff"},{url:"/_next/static/media/20160127_161138-min.8b593b27.webp",revision:"67d90e2f28517e6238d8d37a870e2fbd"},{url:"/_next/static/media/Checked.13da9c1d.webp",revision:"299d222eaeb8881aba0d6e776acbda0e"},{url:"/_next/static/media/Embalagens descartadas.927cb0b1.webp",revision:"4fabda4606ec34206f838b8067a15548"},{url:"/_next/static/media/IMG_20190902_165552685-min.2bc6f742.webp",revision:"297aaf65045cc533c55ffab56256ad97"},{url:"/_next/static/media/IMG_20190902_190152423-min.5326d65b.webp",revision:"f6c596bc92c38c1f9a2c38aa064e6e71"},{url:"/_next/static/media/IMG_20190902_190212548-min.8e16c6b4.webp",revision:"0116b82068b8a56901e67f70cac68817"},{url:"/_next/static/media/IMG_20190902_192932686-min.75609f15.webp",revision:"4e32b9b431b26b74c82f8e9dc0a1c6e7"},{url:"/_next/static/media/IMG_20200116_145421762-min.95c87c35.webp",revision:"aaab731e4f0cc840d00a68bdf8ae95b4"},{url:"/_next/static/media/IMG_20200117_085955109-min.42b0c0ef.webp",revision:"50942681a503e42ad54cbd0e5438407b"},{url:"/_next/static/media/IMG_20200117_090012619-min.9c647ec7.webp",revision:"c0efa11835bf59d900ff5166dd1d9ec3"},{url:"/_next/static/media/IMG_20201015_165641469-min.476ceaf0.webp",revision:"749beccb6762bcf3d8dec39560dff0ff"},{url:"/_next/static/media/IMG_20201015_165913393-min.1082efaa.webp",revision:"403cb30bbf75613c30f0648aecbab179"},{url:"/_next/static/media/IMG_20201015_165928781-min.4f8838ff.webp",revision:"681b075e72dc9e003a80fabd2fc0f04b"},{url:"/_next/static/media/IMG_20201016_122913136_HDR-min.511b5b1f.webp",revision:"6f86193f5822004b8f57efd896bb87db"},{url:"/_next/static/media/IMG_20201016_163615876_HDR-min.adc1d1d0.webp",revision:"8cdf41dd2f812ea1b4bff4139ac1388c"},{url:"/_next/static/media/IMG_20201020_190017378-min.70d1c1d9.webp",revision:"1b7019d5da0911c51b7fb61cea74a033"},{url:"/_next/static/media/IMG_20201028_103741003-min.acab2494.webp",revision:"e204ece6ca9e6b54d3c4d50173b953da"},{url:"/_next/static/media/IMG_20201120_150152637_HDR-min.547bc7ee.webp",revision:"0dbe8668d00bbade1abf3f7b95b1542a"},{url:"/_next/static/media/IMG_20201121_100505949_HDR-min.977c152c.webp",revision:"a55dcd6dea461374ddd66463602d5137"},{url:"/_next/static/media/IMG_20201203_102534590_HDR-min.49c7adb2.webp",revision:"ce9f10f9d617d38753398ad592edb6c8"},{url:"/_next/static/media/IMG_20201204_093626714_HDR-min.155a4e6c.webp",revision:"71bf35047d74b411debd8e936bcf0eb1"},{url:"/_next/static/media/IMG_20201204_143836790_HDR-min.bece1141.webp",revision:"d08b2e6d16b48258b64444738883a749"},{url:"/_next/static/media/IMG_20201208_173244057-min.96724816.webp",revision:"ab220373658f6655735f586e5fba7dac"},{url:"/_next/static/media/IMG_20201208_173254015-min.7b7dda31.webp",revision:"8c22eecbbee21cb76d2bd2c0372a2a77"},{url:"/_next/static/media/IMG_20201208_173312350-min.af744c09.webp",revision:"723b9d8769570a6978f60eb7fcd02762"},{url:"/_next/static/media/IMG_20201208_173342787-min.b5af2464.webp",revision:"d0469af34c464d14a856e457186c30d1"},{url:"/_next/static/media/IMG_20201208_173409896-min.c92d0f80.webp",revision:"d7829d923884fa00d7a4825c70dc4dbc"},{url:"/_next/static/media/IMG_20201208_173429212-min.948511f6.webp",revision:"5ad5bfcc92792ab063740754d9f42072"},{url:"/_next/static/media/IMG_20201208_173753523-min.43aa9790.webp",revision:"888da30ba8e0b9d15035bb56ceaea2ad"},{url:"/_next/static/media/IMG_20201208_173757714-min.cdb7059c.webp",revision:"34f1cb04f2e6078d4e1a7d3149376f30"},{url:"/_next/static/media/IMG_20201208_173831421-min.c4d173df.webp",revision:"8604c3a03f18051d0426b3462056a668"},{url:"/_next/static/media/Whatsapp-Ribermax.c3861b2b.webp",revision:"310a736d7b371ef08ede73110aad8ff2"},{url:"/_next/static/media/besouro chines.7357b99f.jpg",revision:"34b3b2e7fa021db6298712a86a6c039e"},{url:"/_next/static/media/bg_bloco-min.f293e86b.webp",revision:"0252caf8b1d0fb2f477f96c554f4d4da"},{url:"/_next/static/media/bg_h1.bc76319f.webp",revision:"00f215a0b91a45bd6d8d6f2811bca210"},{url:"/_next/static/media/caixa-economica.8ccb65aa.webp",revision:"7dafb5ef96bed7d7e88b00465541d159"},{url:"/_next/static/media/caixa-estruturada.0ab5bcdc.webp",revision:"77bcef9a08f4673f37abd3b5656c8bbc"},{url:"/_next/static/media/caixa-leve.019ef76b.webp",revision:"7b87cddcff1cf5905d018280fc00667c"},{url:"/_next/static/media/caixa-madeira-fumigada-1.8c7b4b42.webp",revision:"211445cc8705677d15a77ed7e441ac43"},{url:"/_next/static/media/caixa-madeira-fumigada-2 (1).3464c11a.webp",revision:"392c555122c86077f403f2ba20ef8c09"},{url:"/_next/static/media/caixa-madeira-fumigada-2.3464c11a.webp",revision:"392c555122c86077f403f2ba20ef8c09"},{url:"/_next/static/media/caixa-madeira-fumigada-3 (1).b1d2c5ab.webp",revision:"19756879818a767f24a49048b267c93b"},{url:"/_next/static/media/caixa-madeira-fumigada-3.b1d2c5ab.webp",revision:"19756879818a767f24a49048b267c93b"},{url:"/_next/static/media/caixa-reforcada.44c7598f.webp",revision:"a46a76fe9e03d485cbb8604a512c44fb"},{url:"/_next/static/media/caixa-resistente.a19ed0fe.webp",revision:"0f29448b535600c7a987c9c3af08d134"},{url:"/_next/static/media/caixa-super-leve.c8580665.webp",revision:"db1ed3b67012411f8852e8f7935aeec3"},{url:"/_next/static/media/caixa-super-reforcada.8a811f91.webp",revision:"1a24599453ce0c4765ca73a610dbdbcd"},{url:"/_next/static/media/caixas-madeira-equipamentos-1.3d56601c.webp",revision:"887319979a8fee0a2d5c63184787581d"},{url:"/_next/static/media/caixas-madeira-equipamentos-2.34c13bf4.webp",revision:"a871fdbca19dba3a8fa8b7dd2eff20a1"},{url:"/_next/static/media/caixas-madeira-equipamentos-3.0f72524d.webp",revision:"fb289c8921cf0acd872a2caf7dd04dc1"},{url:"/_next/static/media/caixas.036d31c1.webp",revision:"63f40e8fc0d9cdc475e86159fae3462d"},{url:"/_next/static/media/caminhao-min.6ca1adcc.webp",revision:"65ea668670e159a61a9cc227c1cea123"},{url:"/_next/static/media/capa_fb.248f58fa.webp",revision:"73f57d077c4aac1223ef4b18df1453cf"},{url:"/_next/static/media/empresa.fc1e167f.webp",revision:"8fa4fe690e157bc223c6ccdc4c9b50e8"},{url:"/_next/static/media/engradado-leve.02cc6d40.webp",revision:"6df2e92068fa56c994d170fd3e80e75e"},{url:"/_next/static/media/engradado-madeira-transporte-1.4652f599.webp",revision:"144b0ba89cb15f5ccb5d38da1324ed62"},{url:"/_next/static/media/engradado-madeira-transporte-2.dd049540.webp",revision:"d7d75f6e4db5a38bfe4f3103d8f2a011"},{url:"/_next/static/media/engradado-madeira-transporte-3.99bcd5e8.webp",revision:"a8263cdba66d1e40c9c5124a85aa96c3"},{url:"/_next/static/media/engradado-reforcado.6280899e.webp",revision:"b179ac877e1fc53deaa824eb81da2982"},{url:"/_next/static/media/engradado-resistente.c47eebcd.webp",revision:"8d2b03b1e3f28818df9c1dbbe0c5e87b"},{url:"/_next/static/media/engradado_economico-300x273.06651348.webp",revision:"8e2524400a4d6c5fb3a188bb087c0561"},{url:"/_next/static/media/especialista-min.3d88bb29.webp",revision:"b35ddae3bc7010b1e97f6c715a8d0467"},{url:"/_next/static/media/fabrica-embalagens-madeira-1 (1).75e6c931.webp",revision:"2501f3b631188d4be0f25abab4f2972d"},{url:"/_next/static/media/fabrica-embalagens-madeira-1.75e6c931.webp",revision:"2501f3b631188d4be0f25abab4f2972d"},{url:"/_next/static/media/fabrica-embalagens-madeira-2.d01208c5.webp",revision:"58aab8985ff8b8baaed7a1f88fc957cd"},{url:"/_next/static/media/fabrica-embalagens-madeira-3.831a445e.webp",revision:"8ca4af11fc97bcce44203760c33605b1"},{url:"/_next/static/media/fabricante-embalagem-madeira-1.6d51b651.webp",revision:"afe74526fd8b3a7d9058984e9870a623"},{url:"/_next/static/media/fabricante-embalagem-madeira-2.0bb36a9e.webp",revision:"ac47d215e01794d52ff115cb27f0ae85"},{url:"/_next/static/media/fabricante-embalagem-madeira-3.8196b4fe.webp",revision:"18c34662e17ca7e0817845a388a50f60"},{url:"/_next/static/media/floresta-min-150x150.bd052dd7.webp",revision:"4caa9fc7c515ba845d8939ba3a969c0b"},{url:"/_next/static/media/floresta-min-min.3a9b325b.webp",revision:"bf236da8e3d3fb55b9ac08ff4cb32f0e"},{url:"/_next/static/media/fumigacao.5f670ca1.webp",revision:"da12249a026024560098b295bb4245e8"},{url:"/_next/static/media/header_caixas.6d7e88f4.webp",revision:"54bcf5dadb5a85ba66a034fe43671e3e"},{url:"/_next/static/media/loader-info.b58612b4.gif",revision:"719464cf88c8e2ef95107b96f5adf2d3"},{url:"/_next/static/media/logomarca-efect-512x512.3b2aba35.png",revision:"b5a05035487aadb35b5c7ac6703b7965"},{url:"/_next/static/media/logomarca-efect.3ec6ef60.webp",revision:"796e383c3c2777be05353db155475685"},{url:"/_next/static/media/logomarca-forest-h.cb48266c.webp",revision:"918db3ce171ee6265aa54013325ea779"},{url:"/_next/static/media/logomarca-h.37004abb.webp",revision:"6b5fd90a58a1931ea683963a6227b468"},{url:"/_next/static/media/logomarca-ribermax.ccae864f.webp",revision:"56da8622d20e08607a5ccd99f86a8745"},{url:"/_next/static/media/logotipo-ribermax-100x100.d26b18b5.webp",revision:"67b9e34632658adf1c4b32c7aafdcc53"},{url:"/_next/static/media/logotipo_ribermax_150x150-min.d0d4424c.webp",revision:"b8843996d3ea03c4942629641d26e656"},{url:"/_next/static/media/logotipo_ribermax_180x180-min.560eb88d.webp",revision:"6f1fd46261481c12b8de34f1859b8825"},{url:"/_next/static/media/logotipo_ribermax_45x45-min.6971f1e1.webp",revision:"7d44be460a1cddb4934dfe76d441c38b"},{url:"/_next/static/media/logotipo_ribermax_45x45_min.2304a1f6.webp",revision:"f83221b6bb7aa08b6caaf0454a94d70f"},{url:"/_next/static/media/logotipo_ribermax_512x512-maskable.497ae8cf.png",revision:"e024a9d73e0496b91eac9e2b47a4cc0e"},{url:"/_next/static/media/logotipo_whatsapp_512x512.b4d334f6.png",revision:"ed69fe5c2573c1bc0808f542720541b4"},{url:"/_next/static/media/lupaCx.8a4f1f13.webp",revision:"ad2c39cf85ed617bc7558baaab66c469"},{url:"/_next/static/media/m_IMG-20180809-WA0008-min.1f90adf1.webp",revision:"6f3a40a4da5d9e96e599ec85683c0725"},{url:"/_next/static/media/m_IMG_20201208_173926536-min.b0237000.webp",revision:"1f19b4793c98229d75354c37daae4d2b"},{url:"/_next/static/media/m_IMG_20201208_174000910-min.ba82aa0a.webp",revision:"1f72d4a47ccbd1f68f602250b8fc7896"},{url:"/_next/static/media/m_IMG_20201208_174013193-min.f303c466.webp",revision:"206159d94d51913aefbe4c8523dd936b"},{url:"/_next/static/media/m_IMG_20201208_174028194-min.062338ca.webp",revision:"1abe63d028b892dc5b00a65bc6c8b884"},{url:"/_next/static/media/m_IMG_20201210_102658269-min.c0465d3d.webp",revision:"4bfcf88c83e9d4733d085131ce88eb72"},{url:"/_next/static/media/m_IMG_20201210_102732447-min.d7b17c09.webp",revision:"18deead4a3cfb90f1508c96c96d83bb7"},{url:"/_next/static/media/m_IMG_20201210_102744536-min.f46d7563.webp",revision:"19de8167520a39584d6c9bd6a7b83ffb"},{url:"/_next/static/media/m_IMG_20201210_102812047-min.a87affab.webp",revision:"4b66afad24aa67e67fcc6bd6c6a3ce40"},{url:"/_next/static/media/m_IMG_20210115_110017071-min.4a248455.webp",revision:"648b741bf0da3b801c218b4aa923c478"},{url:"/_next/static/media/m_IMG_20210115_163838927-min.5c506bd4.webp",revision:"c8207c5b9f6307c4a0c535f158b45ded"},{url:"/_next/static/media/m_IMG_20210127_161914408-min.1d7d3705.webp",revision:"e1cc35a44851a1c0e808f291f7bfe45c"},{url:"/_next/static/media/madeira-vs-papelao.04cbbea0.webp",revision:"0dfa6ed9104592086fefba4c18c7b29b"},{url:"/_next/static/media/mapamundi-min.46831cf4.webp",revision:"38b1836259e35a0ab7f26c1ca6814aed"},{url:"/_next/static/media/palete-sob-medida.2b8aeea5.webp",revision:"7bf7547c295348323c952a4017946d5b"},{url:"/_next/static/media/porto de santos 2.a94e782a.jpg",revision:"3e75496b5ea32d64453d5c1d9a09cdf4"},{url:"/_next/static/media/porto de santos 3.d2eb58b3.jpg",revision:"ad78bbe2b5b97aa90a59799604d819f0"},{url:"/_next/static/media/porto de santos optimized.c86f1e87.avif",revision:"4eb993609b0e2267cb8c5cc93c630559"},{url:"/_next/static/media/porto de santos.f0cc12d4.jpg",revision:"1ef175a316fd8af66a0297de31311d7f"},{url:"/_next/static/media/porto_de_santos.f0cc12d4.jpg",revision:"1ef175a316fd8af66a0297de31311d7f"},{url:"/_next/static/media/sarrafos_sob_medida-300x273.9882ff0a.webp",revision:"e4147fab60137f8cb7024af281b2066d"},{url:"/_next/static/media/sem-imagem.328e70ff.png",revision:"47d0ea95b59909fb3b485a902edbc599"},{url:"/_next/static/media/wood-min.3c8c701a.webp",revision:"4a03a46cb8ee83bf92b3416d0777bb01"},{url:"/_next/static/media/worldwide-min.af7f2ded.webp",revision:"d4d4d3ac1ba31f519eeaeec182202750"},{url:"/_next/static/media/worldwide.0e402a76.webp",revision:"79f9b3c19616f4541f6503d45838073c"},{url:"/googlec0a61b59eadfc290.html",revision:"37c15d8e3db67dcbd297dcd383fbd264"},{url:"/images/20160127_161138-min.webp",revision:"67d90e2f28517e6238d8d37a870e2fbd"},{url:"/images/Checked.webp",revision:"299d222eaeb8881aba0d6e776acbda0e"},{url:"/images/Embalagens descartadas.webp",revision:"4fabda4606ec34206f838b8067a15548"},{url:"/images/IMG_20190902_165552685-min.webp",revision:"297aaf65045cc533c55ffab56256ad97"},{url:"/images/IMG_20190902_190152423-min.webp",revision:"f6c596bc92c38c1f9a2c38aa064e6e71"},{url:"/images/IMG_20190902_190212548-min.webp",revision:"0116b82068b8a56901e67f70cac68817"},{url:"/images/IMG_20190902_192932686-min.webp",revision:"4e32b9b431b26b74c82f8e9dc0a1c6e7"},{url:"/images/IMG_20200116_145421762-min.webp",revision:"aaab731e4f0cc840d00a68bdf8ae95b4"},{url:"/images/IMG_20200117_085955109-min.webp",revision:"50942681a503e42ad54cbd0e5438407b"},{url:"/images/IMG_20200117_090012619-min.webp",revision:"c0efa11835bf59d900ff5166dd1d9ec3"},{url:"/images/IMG_20201015_165641469-min.webp",revision:"749beccb6762bcf3d8dec39560dff0ff"},{url:"/images/IMG_20201015_165913393-min.webp",revision:"403cb30bbf75613c30f0648aecbab179"},{url:"/images/IMG_20201015_165928781-min.webp",revision:"681b075e72dc9e003a80fabd2fc0f04b"},{url:"/images/IMG_20201016_122913136_HDR-min.webp",revision:"6f86193f5822004b8f57efd896bb87db"},{url:"/images/IMG_20201016_163615876_HDR-min.webp",revision:"8cdf41dd2f812ea1b4bff4139ac1388c"},{url:"/images/IMG_20201020_190017378-min.webp",revision:"1b7019d5da0911c51b7fb61cea74a033"},{url:"/images/IMG_20201028_103741003-min.webp",revision:"e204ece6ca9e6b54d3c4d50173b953da"},{url:"/images/IMG_20201120_150152637_HDR-min.webp",revision:"0dbe8668d00bbade1abf3f7b95b1542a"},{url:"/images/IMG_20201121_100505949_HDR-min.webp",revision:"a55dcd6dea461374ddd66463602d5137"},{url:"/images/IMG_20201203_102534590_HDR-min.webp",revision:"ce9f10f9d617d38753398ad592edb6c8"},{url:"/images/IMG_20201204_093626714_HDR-min.webp",revision:"71bf35047d74b411debd8e936bcf0eb1"},{url:"/images/IMG_20201204_143836790_HDR-min.webp",revision:"d08b2e6d16b48258b64444738883a749"},{url:"/images/IMG_20201208_173244057-min.webp",revision:"ab220373658f6655735f586e5fba7dac"},{url:"/images/IMG_20201208_173254015-min.webp",revision:"8c22eecbbee21cb76d2bd2c0372a2a77"},{url:"/images/IMG_20201208_173312350-min.webp",revision:"723b9d8769570a6978f60eb7fcd02762"},{url:"/images/IMG_20201208_173342787-min.webp",revision:"d0469af34c464d14a856e457186c30d1"},{url:"/images/IMG_20201208_173409896-min.webp",revision:"d7829d923884fa00d7a4825c70dc4dbc"},{url:"/images/IMG_20201208_173429212-min.webp",revision:"5ad5bfcc92792ab063740754d9f42072"},{url:"/images/IMG_20201208_173753523-min.webp",revision:"888da30ba8e0b9d15035bb56ceaea2ad"},{url:"/images/IMG_20201208_173757714-min.webp",revision:"34f1cb04f2e6078d4e1a7d3149376f30"},{url:"/images/IMG_20201208_173831421-min.webp",revision:"8604c3a03f18051d0426b3462056a668"},{url:"/images/Whatsapp-Ribermax.webp",revision:"310a736d7b371ef08ede73110aad8ff2"},{url:"/images/besouro chines.jpg",revision:"34b3b2e7fa021db6298712a86a6c039e"},{url:"/images/bg_bloco-min.webp",revision:"0252caf8b1d0fb2f477f96c554f4d4da"},{url:"/images/bg_h1.webp",revision:"00f215a0b91a45bd6d8d6f2811bca210"},{url:"/images/caixa-economica.webp",revision:"7dafb5ef96bed7d7e88b00465541d159"},{url:"/images/caixa-estruturada.webp",revision:"77bcef9a08f4673f37abd3b5656c8bbc"},{url:"/images/caixa-leve.webp",revision:"7b87cddcff1cf5905d018280fc00667c"},{url:"/images/caixa-madeira-fumigada-1.webp",revision:"211445cc8705677d15a77ed7e441ac43"},{url:"/images/caixa-madeira-fumigada-2 (1).webp",revision:"392c555122c86077f403f2ba20ef8c09"},{url:"/images/caixa-madeira-fumigada-2.webp",revision:"392c555122c86077f403f2ba20ef8c09"},{url:"/images/caixa-madeira-fumigada-3 (1).webp",revision:"19756879818a767f24a49048b267c93b"},{url:"/images/caixa-madeira-fumigada-3.webp",revision:"19756879818a767f24a49048b267c93b"},{url:"/images/caixa-reforcada.webp",revision:"a46a76fe9e03d485cbb8604a512c44fb"},{url:"/images/caixa-resistente.webp",revision:"0f29448b535600c7a987c9c3af08d134"},{url:"/images/caixa-super-leve.webp",revision:"db1ed3b67012411f8852e8f7935aeec3"},{url:"/images/caixa-super-reforcada.webp",revision:"1a24599453ce0c4765ca73a610dbdbcd"},{url:"/images/caixas-madeira-equipamentos-1.webp",revision:"887319979a8fee0a2d5c63184787581d"},{url:"/images/caixas-madeira-equipamentos-2.webp",revision:"a871fdbca19dba3a8fa8b7dd2eff20a1"},{url:"/images/caixas-madeira-equipamentos-3.webp",revision:"fb289c8921cf0acd872a2caf7dd04dc1"},{url:"/images/caixas.webp",revision:"63f40e8fc0d9cdc475e86159fae3462d"},{url:"/images/caminhao-min.webp",revision:"65ea668670e159a61a9cc227c1cea123"},{url:"/images/capa_fb.webp",revision:"73f57d077c4aac1223ef4b18df1453cf"},{url:"/images/empresa.webp",revision:"8fa4fe690e157bc223c6ccdc4c9b50e8"},{url:"/images/engradado-leve.webp",revision:"6df2e92068fa56c994d170fd3e80e75e"},{url:"/images/engradado-madeira-transporte-1.webp",revision:"144b0ba89cb15f5ccb5d38da1324ed62"},{url:"/images/engradado-madeira-transporte-2.webp",revision:"d7d75f6e4db5a38bfe4f3103d8f2a011"},{url:"/images/engradado-madeira-transporte-3.webp",revision:"a8263cdba66d1e40c9c5124a85aa96c3"},{url:"/images/engradado-reforcado.webp",revision:"b179ac877e1fc53deaa824eb81da2982"},{url:"/images/engradado-resistente.webp",revision:"8d2b03b1e3f28818df9c1dbbe0c5e87b"},{url:"/images/engradado_economico-300x273.webp",revision:"8e2524400a4d6c5fb3a188bb087c0561"},{url:"/images/especialista-min.webp",revision:"b35ddae3bc7010b1e97f6c715a8d0467"},{url:"/images/fabrica-embalagens-madeira-1 (1).webp",revision:"2501f3b631188d4be0f25abab4f2972d"},{url:"/images/fabrica-embalagens-madeira-1.webp",revision:"2501f3b631188d4be0f25abab4f2972d"},{url:"/images/fabrica-embalagens-madeira-2.webp",revision:"58aab8985ff8b8baaed7a1f88fc957cd"},{url:"/images/fabrica-embalagens-madeira-3.webp",revision:"8ca4af11fc97bcce44203760c33605b1"},{url:"/images/fabricante-embalagem-madeira-1.webp",revision:"afe74526fd8b3a7d9058984e9870a623"},{url:"/images/fabricante-embalagem-madeira-2.webp",revision:"ac47d215e01794d52ff115cb27f0ae85"},{url:"/images/fabricante-embalagem-madeira-3.webp",revision:"18c34662e17ca7e0817845a388a50f60"},{url:"/images/floresta-min-150x150.webp",revision:"4caa9fc7c515ba845d8939ba3a969c0b"},{url:"/images/floresta-min-min.webp",revision:"bf236da8e3d3fb55b9ac08ff4cb32f0e"},{url:"/images/fumigacao.webp",revision:"da12249a026024560098b295bb4245e8"},{url:"/images/header_caixas.webp",revision:"54bcf5dadb5a85ba66a034fe43671e3e"},{url:"/images/loader-info.gif",revision:"719464cf88c8e2ef95107b96f5adf2d3"},{url:"/images/logomarca-efect-512x512.png",revision:"b5a05035487aadb35b5c7ac6703b7965"},{url:"/images/logomarca-efect.webp",revision:"796e383c3c2777be05353db155475685"},{url:"/images/logomarca-forest-h.webp",revision:"918db3ce171ee6265aa54013325ea779"},{url:"/images/logomarca-h.webp",revision:"6b5fd90a58a1931ea683963a6227b468"},{url:"/images/logomarca-ribermax.webp",revision:"56da8622d20e08607a5ccd99f86a8745"},{url:"/images/logotipo-ribermax-100x100.webp",revision:"67b9e34632658adf1c4b32c7aafdcc53"},{url:"/images/logotipo_ribermax_150x150-min.webp",revision:"b8843996d3ea03c4942629641d26e656"},{url:"/images/logotipo_ribermax_180x180-min.webp",revision:"6f1fd46261481c12b8de34f1859b8825"},{url:"/images/logotipo_ribermax_45x45-min.webp",revision:"7d44be460a1cddb4934dfe76d441c38b"},{url:"/images/logotipo_ribermax_45x45_min.webp",revision:"f83221b6bb7aa08b6caaf0454a94d70f"},{url:"/images/logotipo_ribermax_512x512-maskable.png",revision:"e024a9d73e0496b91eac9e2b47a4cc0e"},{url:"/images/logotipo_whatsapp_512x512.png",revision:"ed69fe5c2573c1bc0808f542720541b4"},{url:"/images/lupaCx.webp",revision:"ad2c39cf85ed617bc7558baaab66c469"},{url:"/images/m_IMG-20180809-WA0008-min.webp",revision:"6f3a40a4da5d9e96e599ec85683c0725"},{url:"/images/m_IMG_20201208_173926536-min.webp",revision:"1f19b4793c98229d75354c37daae4d2b"},{url:"/images/m_IMG_20201208_174000910-min.webp",revision:"1f72d4a47ccbd1f68f602250b8fc7896"},{url:"/images/m_IMG_20201208_174013193-min.webp",revision:"206159d94d51913aefbe4c8523dd936b"},{url:"/images/m_IMG_20201208_174028194-min.webp",revision:"1abe63d028b892dc5b00a65bc6c8b884"},{url:"/images/m_IMG_20201210_102658269-min.webp",revision:"4bfcf88c83e9d4733d085131ce88eb72"},{url:"/images/m_IMG_20201210_102732447-min.webp",revision:"18deead4a3cfb90f1508c96c96d83bb7"},{url:"/images/m_IMG_20201210_102744536-min.webp",revision:"19de8167520a39584d6c9bd6a7b83ffb"},{url:"/images/m_IMG_20201210_102812047-min.webp",revision:"4b66afad24aa67e67fcc6bd6c6a3ce40"},{url:"/images/m_IMG_20210115_110017071-min.webp",revision:"648b741bf0da3b801c218b4aa923c478"},{url:"/images/m_IMG_20210115_163838927-min.webp",revision:"c8207c5b9f6307c4a0c535f158b45ded"},{url:"/images/m_IMG_20210127_161914408-min.webp",revision:"e1cc35a44851a1c0e808f291f7bfe45c"},{url:"/images/madeira-vs-papelao.webp",revision:"0dfa6ed9104592086fefba4c18c7b29b"},{url:"/images/mapamundi-min.webp",revision:"38b1836259e35a0ab7f26c1ca6814aed"},{url:"/images/palete-sob-medida.webp",revision:"7bf7547c295348323c952a4017946d5b"},{url:"/images/porto de santos 2.jpg",revision:"3e75496b5ea32d64453d5c1d9a09cdf4"},{url:"/images/porto de santos 3.jpg",revision:"ad78bbe2b5b97aa90a59799604d819f0"},{url:"/images/porto de santos optimized.avif",revision:"4eb993609b0e2267cb8c5cc93c630559"},{url:"/images/porto de santos.jpg",revision:"1ef175a316fd8af66a0297de31311d7f"},{url:"/images/porto_de_santos.jpg",revision:"1ef175a316fd8af66a0297de31311d7f"},{url:"/images/sarrafos_sob_medida-300x273.webp",revision:"e4147fab60137f8cb7024af281b2066d"},{url:"/images/sem-imagem.png",revision:"47d0ea95b59909fb3b485a902edbc599"},{url:"/images/wood-min.webp",revision:"4a03a46cb8ee83bf92b3416d0777bb01"},{url:"/images/worldwide-min.webp",revision:"d4d4d3ac1ba31f519eeaeec182202750"},{url:"/images/worldwide.webp",revision:"79f9b3c19616f4541f6503d45838073c"},{url:"/manifest.json",revision:"d972b520f068d9ab170d59e0e0e5ce2a"},{url:"/pwa/icon-192x192.png",revision:"b07cbbe712f4fb7d45f06cd59f342087"},{url:"/pwa/icon-256x256.png",revision:"1af437f6d6b141cc5af12d05027e1f22"},{url:"/pwa/icon-384x384.png",revision:"cbdab317c93537bce79977c03ca16650"},{url:"/pwa/icon-512x512.png",revision:"37ebbcae4da6e2cf3587ecda582e6870"},{url:"/pwa/sw.js",revision:"4b6b10eed421d4c058df204f43c1b435"},{url:"/pwa/sw.js.map",revision:"612225ec8e0780feb2f64e33f2385dab"},{url:"/pwa/teste.html",revision:"3081abab729236a2f71307974e66e0b8"},{url:"/pwa/workbox-2780d724.js",revision:"53314352e3fd112f46131f80b65e5750"},{url:"/pwa/workbox-2780d724.js.map",revision:"714d6e9f8e0c31c4fa6004eebdf3b469"},{url:"/robots.txt",revision:"c2047f8c139f1d231ab597c0c28fdb22"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:c})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
