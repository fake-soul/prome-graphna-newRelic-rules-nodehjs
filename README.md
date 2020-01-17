
1. prometheus Server:

   `` docker run --name prometheus -d -p 127.0.0.1:9090:9090 --volume="$PWD/config":/etc/config prom/prometheus --config.file=/etc/config/prometheus.yml`` 
   (from current working dir)
2. Grafana Server

   ``docker run -d --name=grafana -p 3000:3000 grafana/grafana``
   
   username/password : admin/admin
   
3. Nodejs DashBoard: 

``nodejs-application-dashboard_rev1.json``



[Graphna Image](sampleImage.png)

