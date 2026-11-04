**Google Cloud Platform** (GCP, these days mostly just called Google Cloud) is Google's public [[Cloud]], the third of the big three next to [[Azure]] and [[Amazon Web Services]]. It's known for [[Kubernetes]], which started at Google, and for data and analytics tools like BigQuery.

---

## How it Works

**Projects**
Everything lives in a project, which holds resources, enabled APIs and IAM policies and is linked to a billing account. Projects can be grouped into folders under an organisation. A project sits somewhere between an Azure subscription and a resource group, and it's normal to have one per app per environment.

**IAM and Service Accounts**
Roles are granted to principals (users, groups, service accounts) on the organisation, a folder, a project or a single resource, and are inherited downwards. Workloads run as service accounts. On GKE, Workload Identity Federation lets a Kubernetes service account act as a Google identity without key files, the same idea as Workload Identity on [[Azure Kubernetes Service|AKS]].

**Global Networking**
A VPC network is global and only its subnets are regional, so one network can span every region without peering. In Azure and AWS a VNet or VPC lives in a single region. Load balancers can be global too, fronting several regions from one IP.

**GKE Autopilot vs Standard**
GKE has two modes. Autopilot manages the nodes, scaling and security settings for you and is what Google recommends for most workloads. Standard gives you node pools to manage yourself, for when you need privileged access or node configuration Autopilot doesn't allow. It's the same split as AKS Automatic vs AKS Standard.

**Cloud Run**
Cloud Run runs containers that scale to zero, either as request-driven services or as run-to-completion jobs. Cloud Functions has been folded in and renamed Cloud Run functions. It's the closest match to Azure Container Apps and a good default for stateless web apps and APIs.

---

## Examples

| Need | Azure | Google Cloud |
| --- | --- | --- |
| Virtual machines | Virtual Machines | Compute Engine |
| Managed Kubernetes | [[Azure Kubernetes Service]] | GKE |
| Serverless functions | [[Function App]] | Cloud Run functions |
| Serverless containers | Container Apps | Cloud Run |
| Web app hosting | [[App Service]] | App Engine |
| Managed PostgreSQL | [[Azure PostgreSQL]] | Cloud SQL for PostgreSQL, AlloyDB |
| Object storage | Blob Storage | Cloud Storage |

```bash
gcloud auth login
gcloud config set project my-project
gcloud config set compute/region australia-southeast1   # Sydney

# Autopilot cluster, then point kubectl at it
gcloud container clusters create-auto demo --location=australia-southeast1
gcloud container clusters get-credentials demo --location=australia-southeast1

# Build the current directory from source and deploy it to Cloud Run
gcloud run deploy web --source . --region=australia-southeast1 --allow-unauthenticated
```

---

### References

- [Google Cloud Overview](https://cloud.google.com/docs/overview)
- [Microsoft Learn: Google Cloud to Azure Services Comparison](https://learn.microsoft.com/en-us/azure/architecture/gcp-professional/services)
- [Wikipedia](https://en.wikipedia.org/wiki/Google_Cloud_Platform)
