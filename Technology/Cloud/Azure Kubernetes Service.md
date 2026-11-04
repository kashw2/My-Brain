**Azure Kubernetes Service** (AKS) is [[Azure]]'s managed [[Kubernetes]]. Azure runs, patches and scales the control plane, and your workloads run on nodes that are ordinary Azure VMs in your subscription.

---

## How it Works

**Automatic vs Standard**
AKS has two modes. AKS Automatic is what Microsoft recommends for most new clusters: nodes are provisioned on demand, and security defaults, monitoring, autoscaling, ingress and upgrades come preconfigured. AKS Standard gives full control over node pools, networking and upgrades, and is what you need for things like Windows nodes or custom networking.

**Node Pools**
In Standard mode nodes are grouped into node pools of identical VMs. A system pool runs cluster add-ons like CoreDNS and needs at least one node, user pools run your apps and can scale to zero. Use separate pools for GPU, spot or [[Windows]] nodes and steer Pods onto them with taints and node selectors.

**Node OS**
[[Linux]] nodes run Ubuntu or [[Azure Linux]], Microsoft's own small distro, and Windows Server pools run Windows containers. Azure Linux is a good default since there are fewer packages to patch and Microsoft owns the whole stack.

**Tiers and SLA**
Free has no financially backed SLA, so keep it for dev and test. Standard adds an uptime SLA on the API server and is the production default (Automatic clusters always use it). Premium adds long term support, where Microsoft keeps maintaining a Kubernetes version after community support ends.

**Azure Integration**
Entra ID handles `kubectl` sign-in, Workload Identity lets Pods use managed identities instead of stored secrets, and `LoadBalancer` Services get an Azure load balancer. For PersistentVolumes, Azure Disks suit a single Pod like a [[StatefulSets|StatefulSet]] replica, and Azure Files suits many Pods sharing one volume.

---

## Examples

```bash
# AKS Automatic, Azure looks after the nodes
az aks create --resource-group rg-demo --name aks-auto --sku automatic

# AKS Standard spread over three zones on Azure Linux
az aks create --resource-group rg-demo --name aks-demo \
	--tier standard \
	--node-count 3 \
	--zones 1 2 3 \
	--os-sku AzureLinux \
	--enable-oidc-issuer \
	--enable-workload-identity \
	--generate-ssh-keys

# A separate user pool for apps that can scale right down to nothing
az aks nodepool add --resource-group rg-demo --cluster-name aks-demo --name apps \
	--mode User \
	--os-sku AzureLinux \
	--enable-cluster-autoscaler --min-count 0 --max-count 5

az aks get-credentials --resource-group rg-demo --name aks-demo
kubectl get nodes -o wide
```

---

### References

- [Microsoft Learn: What is AKS?](https://learn.microsoft.com/en-us/azure/aks/what-is-aks)
- [Microsoft Learn: AKS Automatic](https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic)
- [Microsoft Learn: AKS Pricing Tiers](https://learn.microsoft.com/en-us/azure/aks/free-standard-pricing-tiers)
