Deployments provide a way to provision pods in a Kubernetes cluster. A Deployment's orchestration methodology involves maintaining a set number of replicas across all nodes. A deployment is not ideal in situation where state is to be persisted across multiple Pods because all Pods in a Deployment share a Volume.

# Pros

- Easy to set up
	- Only requires a small amount of Metadata and a PodTemplateSpec
- Attempts to ensure rollout across nodes

# Cons
- Data in memory is lost on container termination
- Multi Pod Persistent Volume Claims can be problematic due to multiple writes to the same file system.
- Doesn't provide predictive termination of Pods
- Non DNS addressable