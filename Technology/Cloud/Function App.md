A **Function App** is the unit you deploy to Azure Functions, [[Azure]]'s serverless compute, grouping one or more functions that share a hosting plan, runtime, settings and scaling. Each function runs when its trigger fires, much like Lambda on [[Amazon Web Services]].

---

## How it Works

**Triggers and Bindings**
Every function has exactly one trigger (HTTP, timer, queue message, blob upload, Service Bus, Event Grid and so on) that decides when it runs. Bindings connect to other services declaratively: input bindings pass data in and output bindings write data out, so putting a message on a queue can just be a return value. They're optional, the normal SDKs work too.

**Hosting Plans**
Flex Consumption is what Microsoft recommends for new serverless apps: pay per execution, scale to zero, fast scale out and VNet integration, on [[Linux]] only. Premium keeps instances warm all the time, Dedicated runs on an [[App Service]] plan you're already paying for, and Container Apps hosting runs it as a container. The original Consumption plan is legacy and its Linux flavour is being retired.

**Cold Starts**
After scaling to zero, the next request waits for an instance to start. If that matters, set always ready instances on Flex Consumption or use Premium. Dedicated doesn't really have cold starts since the host keeps running.

**Write for Retries**
Keep functions stateless and [[Idempotency|idempotent]], because triggers like queues can deliver the same message more than once. HTTP-triggered functions must respond within 230 seconds whatever the timeout is set to, so longer work belongs behind a queue or in Durable Functions, which adds orchestrations with checkpointed state.

**Storage Account**
Every Function App needs an Azure Storage account that the Functions runtime uses internally, so create it alongside the app and treat it as part of the app.

---

## Examples

```bash
# Local project with Core Tools
func init my-funcs --worker-runtime python
cd my-funcs
func new --name hello --template "HTTP trigger"
func start

# Storage account, then a Flex Consumption app
az storage account create --name stdemofuncs --resource-group rg-demo --location australiaeast --sku Standard_LRS
az functionapp create --name func-demo --resource-group rg-demo \
	--storage-account stdemofuncs \
	--flexconsumption-location australiaeast \
	--runtime python \
	--runtime-version <version>

# Keep one instance warm for HTTP triggers to dodge cold starts
az functionapp scale config always-ready set --name func-demo --resource-group rg-demo --settings http=1

func azure functionapp publish func-demo
```

---

### References

- [Microsoft Learn: Azure Functions Overview](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview)
- [Microsoft Learn: Hosting Options](https://learn.microsoft.com/en-us/azure/azure-functions/functions-scale)
- [Microsoft Learn: Triggers and Bindings](https://learn.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)
