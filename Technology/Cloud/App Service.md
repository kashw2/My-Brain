**App Service** is [[Azure]]'s managed platform for hosting web apps and APIs. You give it code or a container and it looks after the VMs, OS patching, load balancing, TLS and scaling, running .NET, Java, Node.js, Python and PHP on [[Linux]] or [[Windows]].

---

## How it Works

**App Service Plan**
Every app runs in an App Service plan, which is the actual compute: region, OS, VM size, instance count and pricing tier. All apps in a plan share the same VMs and scale together, so one busy app can starve the rest. Give heavy apps their own plan.

**Tiers**
Free and Shared run on VMs shared with other customers and can't scale out, fine for testing. Basic, Standard and the Premium tiers run on VMs dedicated to your plan. Isolated runs inside an App Service Environment in your own virtual network. Features like autoscale, deployment slots and zone redundancy depend on the tier, so check before picking the cheapest.

**Deployment Slots**
From Standard up you can add slots like `staging`, which are live apps with their own hostname. Deploy to staging, let it warm up, then swap it with production. The swap is a routing change so no requests get dropped, and swapping again is an instant rollback. Settings marked as slot settings stay put, handy for a staging database connection string.

**Code or Containers**
Deploy a zip of code onto a built-in runtime, or bring your own container image. A container gives you control of the whole stack without having to run [[Azure Kubernetes Service|AKS]].

**When to Pick It**
A mostly stateless web app or API where you don't want to run a cluster. Reach for [[Azure Kubernetes Service|AKS]] when there are lots of services that need Kubernetes features, and [[Function App|Function Apps]] for small event-driven jobs. Function Apps on the Dedicated plan actually run on an App Service plan.

---

## Examples

```bash
# Plan first, then the app. S1 (Standard) is the lowest tier with deployment slots
az appservice plan create --name plan-demo --resource-group rg-demo --sku S1 --is-linux
az webapp list-runtimes --os-type linux
az webapp create --name app-demo --resource-group rg-demo --plan plan-demo --runtime "NODE:<version>"

# az webapp up is deprecated, create + deploy replaces it
# Zip deploys don't install dependencies unless you turn on the build
az webapp config appsettings set --name app-demo --resource-group rg-demo --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true
az webapp deploy --name app-demo --resource-group rg-demo --src-path app.zip

# Blue/green with a staging slot
az webapp deployment slot create --name app-demo --resource-group rg-demo --slot staging
az webapp deploy --name app-demo --resource-group rg-demo --slot staging --src-path app.zip
az webapp deployment slot swap --name app-demo --resource-group rg-demo --slot staging --target-slot production

# Scale out the whole plan, every app in it gets 3 instances
az appservice plan update --name plan-demo --resource-group rg-demo --number-of-workers 3
```

---

### References

- [Microsoft Learn: App Service Overview](https://learn.microsoft.com/en-us/azure/app-service/overview)
- [Microsoft Learn: Staging Environments (Deployment Slots)](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots)
- [Wikipedia](https://en.wikipedia.org/wiki/Azure_Web_Apps)
