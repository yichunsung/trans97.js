class TransTWD97 {
	constructor(){
		this.a = parseFloat(6378137.0); //Equatorial Radius (地球赤道半徑) = 6378137.0 M
		this.b = parseFloat(6356752.314245); //Polar Radius (地球兩極半徑) = 6356752.314245 M
		this.lng0 = 121; //Taiwan central longitude (台灣中心經度) = 121 degree
		this.k0 = 0.9999; // scaling size (縮放比例)
		
		this.dx = 250000; //橫座標平移量
		this.dy = 0; //縱坐標平移量
	}
	TWD97toWGS84(inputTWD97X, inputTWD97Y) {
	// load from UI
		//let inputTWD97X = document.getElementById("inputTWD97X").value;
		//let inputTWD97Y = document.getElementById("inputTWD97Y").value;
	// output the result UI
		let outputWGSData = {} ;
		//let outputResultLatWGS84 = document.getElementById("outputResultLatWGS84");
		//let outputResultLngWGS84 = document.getElementById("outputResultLngWGS84");
		
	// ============= Calculate Section =============
	/*
		let a = parseFloat(6378137.0); //Equatorial Radius (地球赤道半徑) = 6378137.0 M
		let b = parseFloat(6356752.314245); //Polar Radius (地球兩極半徑) = 6356752.314245 M
		let lng0 = 121; //Taiwan central longitude (台灣中心經度) = 121 degree
		let k0 = 0.9999; // scaling size (縮放比例)

		let dx = 250000; //橫座標平移量
		let dy = 0; //縱坐標平移量
	*/
		let a = this.a;
		let b = this.b;
		let lng0 = this.lng0;
		let k0 = this.k0;
		let dx = this.dx;
		let dy = this.dy;

	// 參數：
		let e = Math.sqrt(1 - ((parseFloat(b)*(parseFloat(b))/(parseFloat(a)*parseFloat(a)))));  
	// 橢圓面積離心率 1<e<0

		//let f = (parseFloat(a)-parseFloat(b))/parseFloat(a); //扁平率
		let n =parseFloat( (parseFloat(a)-parseFloat(b))/(parseFloat(a)+parseFloat(b)));

		let AA = (a/( 1 + n ) )*(1 + (1/4)* n**2 + (1/64)*n**4 + (1/256)*n**6 + (25/16384)*n**8 + (49/65536)*n**10);

	//  ~~~~~~~Kruger Series~~~~~~~
		let beta1 = (1/2)*n-(2/3)*n**2 + (37/96)*n**3 - (1/360)*n**4 - (81/512)*n**5 + (96199/604800)*n**6 - (5406467/38707200)*n**7 + (7944359/67737600)*n**8 - (7378753979/97542144000)*n**9 + (25123531261/804722688000)*n**10;
		let beta2 = (1/48)*n**2 + (1/15)*n**3 - (437/1440)*n**4 + (46/105)*n**5 - (1118711/3870720)*n**6 + (51841/1209600)*n**7 + (24749483/348364800)*n**8 - (115295683/1397088000)*n**9 + (5487737251099/51502252032000)*n**10;
		let beta3 = (17/480)*n**3 - (37/840)*n**4 - (209/4480)*n**5 + (5569/90720)*n**6 + (9261899/58060800)*n**7 - (6457463/17740800)*n**8 + (2473691167/9289728000)*n**9 - (852549456029/20922789888000)*n**10;
		let beta4 = (4397/161280)*n**4 - (11/504)*n**5 - (830251/7257600)*n**6 + (466511/2494800)*n**7 + (324154477/7664025600)*n**8 - (937932223/3891888000)*n**9 - (89112264211/5230697472000)*n**10;
		let beta5 = (4583/161280)*n**5 - (108847/3991680)*n**6 - (8005831/63866880)*n**7 + (22894433/124540416)*n**8 + (112731569449/557941063680)*n**9 - (5391039814733/10461394944000)*n**10;
		let beta6 = (20648693/638668800)*n**6 -  (16363163/518918400)*n**7 - (2204645983/12915302400)*n**8 + (4543317553/18162144000)*n**9 + (54894890298749/167382319104000)*n**10;
		let beta7 = (219941297/5535129600)*n**7 - (497323811/12454041600)*n**8 - (79431132943/332107776000)*n**9 + (4346429528407/12703122432000)*n**10;
		let beta8 = (191773887257/3719607091200)*n**8 -  (17822319343/336825216000)*n**9 - (497155444501631/1422749712384000)*n**10;
		let beta9 = (11025641854267/158083301376000)*n**9  - (492293158444691/6758061133824000)*n**10;
		let beta10 = (7028504530429620/72085985427456000)*n**10;

	// xi and eta
		let xi = inputTWD97Y/(k0*AA);
		let eta = (inputTWD97X-dx)/(k0*AA);
		let xip = xi-(beta1*Math.sin(2*xi)*Math.cosh(2*eta)+beta2*Math.sin(4*xi)*Math.cosh(4*eta)+beta3*Math.sin(6*xi)*Math.cosh(6*eta)+beta4*Math.sin(8*xi)*Math.cosh(8*eta)+beta5*Math.sin(10*xi)*Math.cosh(10*eta)+beta6*Math.sin(12*xi)*Math.cosh(12*eta)+beta7*Math.sin(14*xi)*Math.cosh(14*eta));
		let etap = eta-(beta1*Math.cos(2*xi)*Math.sinh(2*eta)+beta2*Math.cos(4*xi)*Math.sinh(4*eta)+beta3*Math.cos(6*xi)*Math.sinh(6*eta)+beta4*Math.cos(8*xi)*Math.sinh(8*eta)+beta5*Math.cos(10*xi)*Math.sinh(10*eta)+beta6*Math.cos(12*xi)*Math.sinh(12*eta)+beta7*Math.cos(14*xi)*Math.sinh(14*eta));
		let taup = Math.sin(xip)/Math.sqrt(Math.sinh(etap)**2+Math.cos(xip)**2);

	// Calculate for Lngitude
		let lngr = Math.atan(Math.sinh(etap)/Math.cos(xip));
		let lngd = lngr*180/Math.PI;
		let resultLng = lngd+lng0;

	// Calculate foe Latitude
		let sigma0 = Math.sinh(e*Math.atanh(e*taup/Math.sqrt(1+taup**2)));
		let f = taup*Math.sqrt(1+sigma0**2)-sigma0*Math.sqrt(1+taup**2)-taup;
		let dfTauDtau =(Math.sqrt((1+sigma0**2)*(1+taup**2))-sigma0*taup)*(1-e**2)*Math.sqrt(1+taup**2)/(1+(1-e**2)*taup**2);
		let taup1 = taup-f/dfTauDtau;
		let resultLat = Math.atan(taup1)*180/Math.PI;
		//alert(resultLng);
		//alert(resultLat);
		//outputResultLatWGS84.innerHTML="緯度： "+resultLat;
		//outputResultLngWGS84.innerHTML="經度： "+resultLng;
		outputWGSData.lat = resultLat;
		outputWGSData.lng = resultLng;
		return outputWGSData;
	}
	WGS84toTWD97(inputLat, inputLng) {

		// load from UI
		//let inputLat = document.getElementById("inputLat").value;
		//let inputLng = document.getElementById("inputLng").value;
		// output the result UI
		let outputResultLatTWD97 = document.getElementById("outputResultLatTWD97");
		let outputResultLngTWD97 = document.getElementById("outputResultLngTWD97");
		let outputResultLatTWD67 = document.getElementById("outputResultLatTWD67");
		let outputResultLngTWD67 = document.getElementById("outputResultLngTWD67");		


	// ============= Calculate Section =============
		/*
		TWD97：
		台灣使用的是2度分帶，以東經121度為中央經線。
		*/

		let a = this.a; //Equatorial Radius (地球赤道半徑) = 6378137.0 M
		let b = this.b; //Polar Radius (地球兩極半徑) = 6356752.314245 M
		let lng0 = this.lng0;; //Taiwan central longitude (台灣中心經度) = 121 degree
		let k0 = this.k0; // scaling size (縮放比例)

		let dx = this.dx; //橫座標平移量
		let dy = this.dy; //縱坐標平移量

	//參數：
		let e = Math.sqrt(1 - ((parseFloat(b)*(parseFloat(b))/(parseFloat(a)*parseFloat(a)))));  
		//橢圓面積離心率 1<e<0

		let f = (parseFloat(a)-parseFloat(b))/parseFloat(a); //扁平率
		let n =parseFloat( (parseFloat(a)-parseFloat(b))/(parseFloat(a)+parseFloat(b)));

	//   ~~~~~~~Kruger Series~~~~~~~

		//AA = =(a/( 1 + n ) )*(1 + (1/4)* n**2 + (1/64)*n**4 + (1/256)*n**6 + (25/16384)*n**8 + (49/65536)*n**10)
		let AA = (a/( 1 + n ) )*(1 + (1/4)* n**2 + (1/64)*n**4 + (1/256)*n**6 + (25/16384)*n**8 + (49/65536)*n**10);

		let alpha1 = (1/2)*n - (2/3)*n**2 + (5/16)*n**3 + (41/180)*n**4 - (127/288)*n**5 + (7891/37800)*n**6 + (72161/387072)*n**7 - (18975107/50803200)*n**8 + (60193001/290304000)*n**9 + (134592031/1026432000)*n**10;
		
		let alpha2 = (13/48)*n**2 - (3/5)*n**3 + (557/1440)*n**4 + (281/630)*n**5 - (1983433/1935360)*n**6 + (13769/28800)*n**7 + (148003883/174182400)*n**8 - (705286231/465696000)*n**9 + (1703267974087/3218890752000)*n**10;
		
		let alpha3 = (61/240)*n**3 - (103/140)*n**4 + (15061/26880)*n**5 + (167603/181440)*n**6 - (67102379/29030400)*n**7 + (79682431/79833600)*n**8 + (6304945039/2128896000)*n**9 -  (6601904925257/1307674368000)*n**10;

		let alpha4 = (49561/161280)*n**4 - (179/168)*n**5 + (6601661/7257600)*n**6 + (97445/49896)*n**7 - (40176129013/7664025600)*n**8 + (138471097/66528000)*n**9 + (48087451385201/5230697472000)*n**10;

		let alpha5 = (34729/80640)*n**5 - (3418889/1995840)*n**6 + (14644087/9123840)*n**7 +   (2605413599/622702080)*n**8 - (31015475399/2583060480)*n**9 +  (5820486440369/1307674368000)*n**10;

		let alpha6 = (212378941/319334400)*n**6 - (30705481/10378368)*n**7 + (175214326799/58118860800)*n**8 + (870492877/96096000)*n**9 - (1328004581729000/47823519744000)*n**10;

		let alpha7 = (1522256789/1383782400)*n**7 - (16759934899/3113510400)*n**8 + (1315149374443/221405184000)*n**9 + (71809987837451/3629463552000)*n**10;

		let alpha8 = (1424729850961/743921418240)*n**8 -   (256783708069/25204608000)*n**9 + (2468749292989890/203249958912000)*n**10;

		let alpha9 = (21091646195357/6080126976000)*n**9 - (67196182138355800/3379030566912000)*n**10;

		let alpha10 = (77911515623232800/12014330904576000)*n**10;

	// Load Latitude and Longitude
		let lat = parseFloat(inputLat); // 浮點數計算
		let lng = parseFloat(inputLng); // 浮點數計算
		let latr = lat*Math.PI/180; // 弧度
		let Dlng = lng-lng0;  // 經度與中央經線相差值
		let Dlngr = Dlng*Math.PI/180; // 弧度
	// conformal latitude
		let confLat = Math.atan(Math.sinh(Math.asinh(Math.tan(latr))-e*Math.atanh(e*Math.sin(latr))));

	// sigma
		let sigma = Math.sinh(e*Math.atanh(e*Math.tan(latr)/Math.sqrt(1+Math.tan(latr)**2)));

	// tau = tan(lat) , taup = tau' = tan(conLat) 
		let tau = Math.tan(latr);	
		let taup = Math.tan(confLat);
	// xi = North direction, conformal Xi', 
	// eta =  East direction, conformal eta.
		let xip = Math.atan(taup/Math.cos(Dlngr));
		let etap = Math.asinh(Math.sin(Dlngr)/Math.sqrt(taup*taup+(Math.cos(Dlngr)**2)));

		let xi = xip+alpha1*Math.sin(2*xip)*Math.cosh(2*etap)+alpha2*Math.sin(4*xip)*Math.cosh(4*etap)+alpha3*Math.sin(6*xip)*Math.cosh(6*etap)+alpha4*Math.sin(8*xip)*Math.cosh(8*etap)+alpha5*Math.sin(10*xip)*Math.cosh(10*etap)+alpha6*Math.sin(12*xip)*Math.cosh(12*etap)+alpha7*Math.sin(14*xip)*Math.cosh(14*etap);
		
		let eta = etap+alpha1*Math.cos(2*xip)*Math.sinh(2*etap)+alpha2*Math.cos(4*xip)*Math.sinh(4*etap)+alpha3*Math.cos(6*xip)*Math.sinh(6*etap)+alpha4*Math.cos(8*xip)*Math.sinh(8*etap)+alpha5*Math.cos(10*xip)*Math.sinh(10*etap)+alpha6*Math.cos(12*xip)*Math.sinh(12*etap)+alpha6*Math.cos(14*xip)*Math.sinh(14*etap);
		

		let easting = k0*AA*eta;
		let northing = k0*AA*xi;

	// 取得南北緯與東西經

		//let getNEWSId = document.getElementById("getNEWSId");
		//let NSSelect = document.getElementById("NSSelect");
		//let WESelect = document.getElementById("WESelect");
		//let NSSelectIndex = NSSelect.selectedIndex;
		let NSSelectIndex = 0;
		//let NSSelectResult = NSSelect.options[NSSelectIndex].text;
		//let WESelectIndex = WESelect.selectedIndex;
		let WESelectIndex = 0;
		//let WESelectResult = WESelect.options[WESelectIndex].text;
		//let NSDirection; 
		//let WEDirection;
		//let northingFix97;
		//let eastingFix97;
		//let northingFix67;
		//let eastingFix67;
	
		// N + E.
		let NSDirection = 1; 
		let WEDirection = 1;
		let outputData97 ={};
		let northingFix97 = Math.round(northing);
		let eastingFix97 = Math.round(dx+(easting*1));

		outputData97.northingFix97 = northingFix97;
		outputData97.eastingFix97 = eastingFix97;

		let northingFix67 =  Math.round(northingFix97+207);
		let eastingFix67 =  Math.round(eastingFix97-828);
		//outputResultLatTWD97.innerHTML ="TWD97 Y坐標： "+ northingFix97;
		//outputResultLngTWD97.innerHTML ="TWD97 X坐標： "+ eastingFix97;
		//outputResultLatTWD67.innerHTML ="TWD67 Y坐標： "+ northingFix67;
		//outputResultLngTWD67.innerHTML ="TWD67 X坐標： "+ eastingFix67;
		
		return outputData97;		
	}
	WGS84toTWD67(inputLat, inputLng){
		let dataTWD97 = this.WGS84toTWD97(inputLat, inputLng);
		let outputData67 = {};
		let northingFix67 =  Math.round(dataTWD97.northingFix97+207);
		let eastingFix67 =  Math.round(dataTWD97.eastingFix97-828);
		outputData67.northingFix67 = northingFix67;
		outputData67.eastingFix67 = eastingFix67;
		return outputData67;
	}
	distance_TWD97(origin_TWD97_X, origin_TWD97_Y, observation_TWD97_X, observation_TWD97_Y){
		  let distance = Math.sqrt((origin_TWD97_X-observation_TWD97_X)*(origin_TWD97_X-observation_TWD97_X)+(origin_TWD97_Y-observation_TWD97_Y)*(origin_TWD97_Y-observation_TWD97_Y))/1000;
		  return distance;
	}
	distance_WGS84(origin_lat, origin_lng, obervation_lat, obervation_lng){
		// input origin point location 
		let origin_point_pi_lat = (origin_lat/180)*Math.PI;
		let origin_point_pi_lng = (origin_lng/180)*Math.PI;
		// input observation point location data
		let obervation_lat_pi = (obervation_lat/180)*Math.PI;
		let obervation_lng_pi = (obervation_lng/180)*Math.PI;
		let D = 6378100*Math.acos(Math.sin(obervation_lat_pi)*Math.sin(origin_point_pi_lat)+Math.cos(obervation_lat_pi)*Math.cos(origin_point_pi_lat)*Math.cos(obervation_lng_pi-origin_point_pi_lng));
		let distance = D/1000;
		return distance;
	}

}

export default TransTWD97;

