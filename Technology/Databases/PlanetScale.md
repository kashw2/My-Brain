**PlanetScale** is a managed [[Databases|Database]] platform that started out as hosted MySQL on Vitess and now also runs [[PostgreSQL]], with a big focus on safe schema changes and scaling out by sharding. **The lineup and plans below are correct as of 2026-11-04**, it's changed a lot over the last couple of years.

---

## How it Works

**Status (correct as of 2026-11-04)**
There are three engines: **Vitess** (MySQL compatible, the original product), **Postgres** (generally available since September 2025) and **Neki**, PlanetScale's own sharded Postgres, which has been in platform preview since September 2026. Preview means beta terms with no SLA, so not for production yet. There's no free plan anymore, the Hobby tier was retired in April 2024. It runs on [[Amazon Web Services|AWS]] and [[Google Cloud Platform|Google Cloud]], and Enterprise customers can have it run inside their own cloud account.

**Vitess**
Vitess was built at YouTube to scale MySQL. It puts a routing layer in front of lots of MySQL instances so one logical database can be split (sharded) across many servers, while your app still just talks MySQL to it. Neki is the same idea for Postgres.

**Branching and Deploy Requests**
You make schema changes on a branch (a copy of the schema), then open a deploy request, which is basically a pull request for your database. PlanetScale applies it as an online schema change so a big `ALTER TABLE` doesn't lock the table. Branching works on both Vitess and Postgres, deploy requests are a Vitess feature.

**Metal**
Metal clusters use local NVMe drives instead of network attached storage, which is a lot faster. Losing a local disk means losing that node's data, so Metal clusters always run a primary plus two replicas in different availability zones and fail over to a replica, the usual [[Automatic Failover]] pattern.

**When to Pick It**
A good fit when you expect to outgrow a single database server, or when a team ships lots of schema changes and wants them reviewed and safe. For a small side project the lack of a free tier makes it a harder sell than self-hosted [[PostgreSQL]] or a small [[Azure PostgreSQL]] server.

---

## Examples

```bash
# Branch off main and open a SQL shell on the new branch
pscale branch create my-app add-last-login
pscale shell my-app add-last-login
```

```sql
-- On the add-last-login branch, nothing here touches production yet
ALTER TABLE users ADD COLUMN last_login_at DATETIME NULL;
CREATE INDEX idx_users_last_login_at ON users (last_login_at);
```

```bash
# Open a deploy request against main, then deploy it once it's been reviewed
pscale deploy-request create my-app add-last-login
pscale deploy-request deploy my-app 1
```

---

### References

- [PlanetScale Documentation](https://planetscale.com/docs)
- [PlanetScale: PlanetScale for Postgres is now GA](https://planetscale.com/blog/planetscale-for-postgres-is-generally-available)
- [PlanetScale: Neki is now available in platform preview](https://planetscale.com/changelog/neki)
