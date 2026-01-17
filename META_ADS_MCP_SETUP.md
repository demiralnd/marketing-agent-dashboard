# Meta Ads MCP Setup Guide

This guide explains how to connect your marketing agent to Meta Ads using the **Meta Ads MCP** (Model Context Protocol) from [Pipeboard](https://pipeboard.co).

## What is Meta Ads MCP?

Meta Ads MCP is a Model Context Protocol server that allows AI assistants (like Claude, Cursor, or other MCP-compatible clients) to interact with Meta Ads. It enables:

- 📊 **AI-Powered Campaign Analysis** - Analyze campaigns and get actionable insights
- 💡 **Strategic Recommendations** - Data-backed suggestions for optimization
- 📈 **Performance Monitoring** - Track metrics and get alerts about changes
- 💰 **Budget Optimization** - Recommendations for reallocating spend
- 🎨 **Creative Improvement** - Feedback on ad copy and imagery
- ⚙️ **Campaign Management** - Create and manage campaigns, ad sets, and ads

---

## Quick Setup (Recommended)

### For Cursor Users

The MCP configuration has been added to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "meta-ads-mcp": {
      "url": "https://mcp.pipeboard.co/meta-ads-mcp"
    }
  }
}
```

**Next Steps:**
1. **Restart Cursor** to load the MCP configuration
2. Look for the MCP integration in Cursor's settings/features
3. Click **"Needs login"** when prompted to connect your Facebook Ads account
4. Complete the OAuth flow at Pipeboard to authorize access

### For Claude Pro/Max Users

1. Go to [claude.ai/settings/integrations](https://claude.ai/settings/integrations)
2. Click **"Add Integration"**
3. Enter:
   - **Name:** Pipeboard Meta Ads
   - **Integration URL:** `https://mcp.pipeboard.co/meta-ads-mcp`
4. Click **"Connect"** and follow the prompts to:
   - Login to Pipeboard
   - Connect your Facebook Ads account

---

## Advanced: Direct Token Authentication

If you prefer to authenticate without the interactive login flow:

1. Get your Pipeboard API token at [pipeboard.co/api-tokens](https://pipeboard.co/api-tokens)
2. Update your configuration to use the token:

**For Cursor** (`~/.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "meta-ads-mcp": {
      "url": "https://mcp.pipeboard.co/meta-ads-mcp?token=YOUR_PIPEBOARD_TOKEN"
    }
  }
}
```

**For Claude:**
Use this Integration URL: `https://mcp.pipeboard.co/meta-ads-mcp?token=YOUR_PIPEBOARD_TOKEN`

---

## Available MCP Tools

Once connected, you'll have access to these Meta Ads tools:

| Tool | Description |
|------|-------------|
| `mcp_meta_ads_get_ad_accounts` | Get accessible ad accounts |
| `mcp_meta_ads_get_account_info` | Get detailed account information |
| `mcp_meta_ads_get_account_pages` | Get pages associated with an account |
| `mcp_meta_ads_get_campaigns` | List campaigns with optional filtering |
| `mcp_meta_ads_get_campaign_details` | Get detailed campaign information |
| `mcp_meta_ads_create_campaign` | Create a new campaign |
| `mcp_meta_ads_get_adsets` | Get ad sets for an account |
| `mcp_meta_ads_get_adset_details` | Get detailed ad set information |
| `mcp_meta_ads_create_adset` | Create a new ad set |
| `mcp_meta_ads_get_ads` | Get ads for an account |
| `mcp_meta_ads_get_ad_details` | Get detailed ad information |
| `mcp_meta_ads_create_ad` | Create a new ad |
| `mcp_meta_ads_get_insights` | Get performance insights |
| `mcp_meta_ads_search` | Search for campaigns, ads, or pages |

---

## Example Usage

Once configured, you can ask your AI assistant questions like:

- *"Show me all my Meta ad accounts"*
- *"What's the performance of my active campaigns?"*
- *"Create a new awareness campaign with $50/day budget"*
- *"Which ad sets have the best ROAS?"*
- *"Analyze my ad creative performance this month"*

---

## Integration with Existing Backend

Your existing `meta_service.py` uses direct Meta Graph API calls. The MCP approach is **complementary**:

| Approach | Best For |
|----------|----------|
| **Direct API** (`meta_service.py`) | Automated data pipelines, scheduled reports |
| **MCP Integration** | AI-powered analysis, conversational management |

You can use both approaches simultaneously:
- Keep `meta_service.py` for your dashboard's data fetching
- Use Meta Ads MCP for AI-assisted campaign management and analysis

---

## Troubleshooting

### MCP Not Showing in Cursor
1. Ensure `~/.cursor/mcp.json` exists with the correct configuration
2. Restart Cursor completely
3. Check Cursor's developer console for errors

### Login/Authentication Issues
1. Clear your browser cache and cookies
2. Try a private/incognito window
3. Ensure your Facebook account has access to the Meta Ads account

### Still Need Help?
- **Discord:** [discord.gg/YzMwQ8zrjr](https://discord.gg/YzMwQ8zrjr)
- **Email:** info@pipeboard.co

---

## Resources

- [Pipeboard Website](https://pipeboard.co)
- [Meta Ads MCP GitHub](https://github.com/pipeboard-co/meta-ads-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
