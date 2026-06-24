import React, { useEffect, useState } from "react";
import { fetchAllProperties, updatePropertyAdminStatus } from "../../../lib/mongo/services/adminDashboardServices";
import { deleteProperty } from "../../../lib/mongo/services/propertyService";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const PropertyDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProperties();
      setProperties(data?.properties || []);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleUpdateStatus = async (propertyId, newStatus, isActive) => {
    try {
      await updatePropertyAdminStatus(propertyId, { status: newStatus, isActive });
      setProperties((prev) =>
        prev.map((property) =>
          property._id === propertyId ? { ...property, status: newStatus, isActive } : property
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update property status.");
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm("Are you sure you want to permanently delete this property? This action cannot be undone.")) {
      try {
        await deleteProperty(propertyId);
        setProperties((prev) => prev.filter((p) => p._id !== propertyId));
      } catch (error) {
        console.error("Failed to delete property", error);
        alert("Failed to delete property.");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground flex justify-center items-center h-64">
        <Icon name="Loader2" className="animate-spin mr-2" />
        Loading Properties...
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground mt-1">Review and manage all property listings on the platform.</p>
        </div>
        <Button variant="outline" iconName="RefreshCw" onClick={loadProperties}>
          Refresh
        </Button>
      </div>

      <div className="bg-card border border-border rounded overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-foreground">Property</th>
                <th className="px-6 py-4 font-semibold text-foreground">Location</th>
                <th className="px-6 py-4 font-semibold text-foreground">Price</th>
                <th className="px-6 py-4 font-semibold text-foreground">Status / Active</th>
                <th className="px-6 py-4 font-semibold text-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-muted/20 transition-smooth">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-12 w-16 flex-shrink-0 bg-muted rounded overflow-hidden">
                        {property.images && property.images.length > 0 ? (
                          <img src={property.images[0].url} alt={property.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Icon name="Image" size={20} />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 max-w-[200px]">
                        <div className="font-medium text-foreground truncate">{property.title}</div>
                        <div className="text-muted-foreground text-xs truncate">By {property.postedBy?.name || "Unknown"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground max-w-[150px] truncate">
                    {property.location?.city}, {property.location?.state}
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    ₹{(property.price / 100000).toFixed(2)} L
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.status === 'active' ? 'bg-success/20 text-success' :
                        property.status === 'sold' ? 'bg-primary/20 text-primary' :
                        property.status === 'pending' ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {property.status.toUpperCase()}
                      </span>
                      <span className={`text-xs ${property.isActive ? 'text-success' : 'text-destructive'}`}>
                        {property.isActive ? "Published" : "Hidden"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/property-details/${property.slug}`, "_blank")}
                      title="View Live"
                      className="px-2"
                    >
                      <Icon name="ExternalLink" size={16} />
                    </Button>

                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/properties/edit/${property._id}`)}
                      title="Edit"
                      className="px-2 text-primary border-primary hover:bg-primary/10"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>

                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProperty(property._id)}
                      title="Delete"
                      className="px-2 text-destructive border-destructive hover:bg-destructive/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>

                    <div className="inline-block border-l border-border mx-1 h-6 align-middle"></div>


                    <Button 
                      variant="primary"
                      size="sm"
                      onClick={() => handleUpdateStatus(property._id, "sold", false)}
                      disabled={property.status === "sold"}
                    >
                      Mark Sold
                    </Button>
                    <Button 
                      variant={property.isActive ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateStatus(property._id, property.status, !property.isActive)}
                    >
                      {property.isActive ? "Hide" : "Show"}
                    </Button>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                    No properties found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyDashboard;