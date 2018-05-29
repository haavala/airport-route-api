		 _______ _________ _______  _______  _______  _______ _________   _______  _______          _________ _______    _______  _______ _________
		(  ___  )\__   __/(  ____ )(  ____ )(  ___  )(  ____ )\__   __/  (  ____ )(  ___  )|\     /|\__   __/(  ____ \  (  ___  )(  ____ )\__   __/
		| (   ) |   ) (   | (    )|| (    )|| (   ) || (    )|   ) (     | (    )|| (   ) || )   ( |   ) (   | (    \/  | (   ) || (    )|   ) (   
		| (___) |   | |   | (____)|| (____)|| |   | || (____)|   | |     | (____)|| |   | || |   | |   | |   | (__      | (___) || (____)|   | |   
		|  ___  |   | |   |     __)|  _____)| |   | ||     __)   | |     |     __)| |   | || |   | |   | |   |  __)     |  ___  ||  _____)   | |   
		| (   ) |   | |   | (\ (   | (      | |   | || (\ (      | |     | (\ (   | |   | || |   | |   | |   | (        | (   ) || (         | |   
		| )   ( |___) (___| ) \ \__| )      | (___) || ) \ \__   | |     | ) \ \__| (___) || (___) |   | |   | (____/\  | )   ( || )      ___) (___
		|/     \|\_______/|/   \__/|/       (_______)|/   \__/   )_(     |/   \__/(_______)(_______)   )_(   (_______/  |/     \||/       \_______/
		                                                                                                                                           


# Data

From [openflight.org](https://openflights.org/data.html):


		$ curl https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat --output data/airports.dat

Some insights about the data:

		$ wc -l data/airports.dat 

		7184 data/airports.dat

		$ head -n 2 data/airports.dat

1,"Goroka Airport","Goroka","Papua New Guinea","GKA","AYGA",-6.081689834590001,145.391998291,5282,10,"U","Pacific/Port_Moresby","airport","OurAirports"
2,"Madang Airport","Madang","Papua New Guinea","MAG","AYMD",-5.20707988739,145.789001465,20,10,"U","Pacific/Port_Moresby","airport","OurAirports"

Each entry contains the following information:
Each entry contains the following information:

Airport ID, Name, City, Country, IATA, ICAO, Latitude, Longitude, Altitude, Timezone, DST Daylight savings time, Tz database time zone, Type, Source


                                                                                                                                         

